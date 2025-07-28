const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const initSqlJs = require('sql.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// SQLite database setup with sql.js
let db = null;

// Initialize database
const initDatabase = async () => {
  const SQL = await initSqlJs();
  db = new SQL.Database();
  
  // Create contacts table
  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      message TEXT NOT NULL,
      ip TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  console.log('Connected to SQLite database');
  console.log('Database synchronized');
};

// Contact operations
const Contact = {
  create: (data) => {
    const stmt = db.prepare('INSERT INTO contacts (name, email, company, message, ip) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run([data.name, data.email, data.company, data.message, data.ip]);
    return { id: result.lastInsertRowid, ...data };
  },
  findAll: (options = {}) => {
    let query = 'SELECT * FROM contacts';
    if (options.attributes && options.attributes.exclude) {
      const excludeFields = options.attributes.exclude;
      const allFields = ['id', 'name', 'email', 'company', 'message', 'ip', 'timestamp'];
      const selectFields = allFields.filter(field => !excludeFields.includes(field));
      query = `SELECT ${selectFields.join(', ')} FROM contacts`;
    }
    if (options.order) {
      query += ` ORDER BY ${options.order[0][0]} ${options.order[0][1]}`;
    }
    if (options.limit) {
      query += ` LIMIT ${options.limit}`;
    }
    const stmt = db.prepare(query);
    return stmt.all();
  }
};

// Initialize database
initDatabase().catch(err => {
  console.error('Database connection error:', err);
});

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Name, email, and message are required' 
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Please provide a valid email address' 
      });
    }
    
    // Length validation
    if (name.length > 100 || email.length > 255 || message.length > 2000) {
      return res.status(400).json({ 
        error: 'Input exceeds maximum length' 
      });
    }
    
    const contact = Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company ? company.trim() : null,
      message: message.trim(),
      ip: req.ip || req.connection.remoteAddress
    });
    
    res.status(201).json({ 
      message: 'Contact form submitted successfully',
      id: contact.id
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Admin route to get all contacts (protected)
app.get('/api/admin/contacts', async (req, res) => {
  try {
    const adminKey = req.headers['x-admin-key'];
    
    if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const contacts = Contact.findAll({
      attributes: { exclude: ['ip'] },
      order: [['timestamp', 'DESC']],
      limit: 100
    });
    
    res.json(contacts);
    
  } catch (error) {
    console.error('Admin contacts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;