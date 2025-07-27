const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
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

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/generative-silicon';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Contact submission schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 255
  },
  company: {
    type: String,
    trim: true,
    maxlength: 100
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  ip: {
    type: String
  }
});

const Contact = mongoose.model('Contact', contactSchema);

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
    
    const contact = new Contact({
      name,
      email,
      company: company || '',
      message,
      ip: req.ip
    });
    
    await contact.save();
    
    res.status(201).json({ 
      message: 'Contact form submitted successfully',
      id: contact._id
    });
    
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
});

// Get all contacts (admin only - simple auth with secret key)
app.get('/api/contacts', async (req, res) => {
  try {
    const adminKey = req.headers['x-admin-key'];
    
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const contacts = await Contact.find()
      .sort({ timestamp: -1 })
      .select('-ip')
      .limit(100);
    
    res.json(contacts);
    
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
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