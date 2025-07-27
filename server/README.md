# Generative Silicon Backend API

This is the backend API for the Generative Silicon website contact form. It provides endpoints for storing and retrieving contact form submissions.

## Features

- Contact form submission storage
- MongoDB database integration
- Rate limiting and security middleware
- Admin panel API for viewing submissions
- CORS configuration for frontend integration

## Setup

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your actual values
```

3. Start MongoDB locally or use MongoDB Atlas

4. Run the development server:
```bash
npm run dev
```

### Production Deployment (Vercel)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   - `FRONTEND_URL`: Your frontend URL (GitHub Pages)
   - `ADMIN_SECRET_KEY`: A secure random string
   - `NODE_ENV`: production

### Alternative Deployment Options

- **Railway**: Connect your GitHub repo and deploy
- **Heroku**: Use the Heroku CLI or GitHub integration
- **DigitalOcean App Platform**: Deploy directly from GitHub

## API Endpoints

### POST /api/contact
Submit a contact form

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Tech Corp",
  "message": "Interested in your services"
}
```

**Response:**
```json
{
  "message": "Contact form submitted successfully",
  "id": "contact_id"
}
```

### GET /api/contacts
Retrieve all contact submissions (Admin only)

**Headers:**
```
X-Admin-Key: your-admin-secret-key
```

**Response:**
```json
[
  {
    "_id": "contact_id",
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Tech Corp",
    "message": "Interested in your services",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Security Features

- Rate limiting (10 requests per 15 minutes per IP)
- Input validation and sanitization
- CORS protection
- Helmet.js security headers
- Admin authentication for sensitive endpoints

## Environment Variables

- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)
- `MONGODB_URI`: MongoDB connection string
- `FRONTEND_URL`: Frontend URL for CORS
- `ADMIN_SECRET_KEY`: Secret key for admin access