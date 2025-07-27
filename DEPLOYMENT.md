# Deployment Guide for Generative Silicon Website

This guide explains how to deploy both the frontend (React app) and backend (Node.js API) for the Generative Silicon website.

## Overview

The application consists of:
- **Frontend**: React app deployed on GitHub Pages
- **Backend**: Node.js/Express API deployed on Vercel (or similar service)
- **Database**: MongoDB Atlas (cloud database)

## Prerequisites

1. GitHub account
2. Vercel account (or Railway/Heroku)
3. MongoDB Atlas account
4. Node.js installed locally

## Backend Deployment

### Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string (replace `<password>` with your actual password)
5. Whitelist your IP addresses (or use 0.0.0.0/0 for all IPs)

### Step 2: Deploy Backend to Vercel

#### Option A: Vercel Web Interface (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Set the **Root Directory** to `server`
5. Vercel will auto-detect it as a Node.js project
6. Add environment variables in the deployment settings:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `FRONTEND_URL`: Your GitHub Pages URL (e.g., `https://yourusername.github.io/gen_silicon_web`)
   - `ADMIN_SECRET_KEY`: A secure random string for admin access
   - `NODE_ENV`: production
7. Click "Deploy"

#### Option B: Vercel CLI (If authentication works)

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```
   
4. Deploy to Vercel:
   ```bash
   vercel
   ```

5. Set environment variables in Vercel dashboard (same as Option A)

**Note**: If Vercel CLI authentication fails with "Account not found", use Option A (web interface) or try the alternative deployment options below.`

### Alternative Deployment Options

#### Option C: Railway (Easy GitHub Integration)

1. Go to [Railway](https://railway.app) and sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect the Node.js app in the `server` folder
5. Add environment variables in Railway dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `FRONTEND_URL`: Your GitHub Pages URL
   - `ADMIN_SECRET_KEY`: A secure random string
   - `NODE_ENV`: production
6. Railway will automatically deploy and provide a URL

#### Option D: Render (Free Tier Available)

1. Go to [Render](https://render.com) and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Set:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add the same environment variables as above
6. Deploy

#### Option E: Netlify Functions (Serverless)

1. Go to [Netlify](https://netlify.com)
2. Drag and drop your `server` folder or connect GitHub
3. Netlify will detect it as a Node.js function
4. Configure environment variables in site settings
5. Deploy

**Recommendation**: If Vercel web interface doesn't work, try Railway as it has excellent GitHub integration and is very developer-friendly.

## Frontend Deployment

### Step 1: Prepare Repository

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Add backend integration and deployment setup"
   git push origin main
   ```

### Step 2: Configure GitHub Pages

1. Go to your GitHub repository settings
2. Navigate to "Pages" section
3. Select "GitHub Actions" as the source
4. The workflow will automatically deploy when you push to main

### Step 3: Set Environment Variables

1. In your GitHub repository, go to Settings > Secrets and variables > Actions
2. Add a new repository secret:
   - Name: `VITE_API_URL`
   - Value: Your deployed backend URL (e.g., `https://your-backend.vercel.app`)

### Step 4: Update Base Path (if needed)

If your repository name is different from `gen_silicon_web`, update the base path in `vite.config.js`:

```javascript
base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/'
```

## Local Development Setup

### Backend

1. Navigate to server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` with your local MongoDB URI and other settings

5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to project root:
   ```bash
   cd ..
   ```

2. Create `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```

3. Set local API URL in `.env.local`:
   ```
   VITE_API_URL=http://localhost:3001
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Testing the Deployment

### Frontend
1. Visit your GitHub Pages URL
2. Test the contact form submission
3. Verify animations and responsiveness

### Backend
1. Test the health endpoint: `GET /api/health`
2. Test contact submission: `POST /api/contact`
3. Test admin panel with your secret key

### Admin Panel Access
1. Add `?admin=true` to your website URL
2. Triple-click the footer to toggle admin panel
3. Enter your admin secret key when prompted

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `FRONTEND_URL` is correctly set in backend environment variables

2. **Database Connection**: Verify MongoDB Atlas connection string and IP whitelist

3. **Build Failures**: Check that all environment variables are set in GitHub Actions

4. **404 on GitHub Pages**: Ensure the base path in `vite.config.js` matches your repository name

5. **API Not Found**: Verify the `VITE_API_URL` environment variable is correctly set

### Logs and Debugging

- **Vercel**: Check function logs in Vercel dashboard
- **GitHub Actions**: Check workflow logs in Actions tab
- **Browser**: Use developer tools to check network requests

## Security Considerations

1. **Admin Key**: Use a strong, random admin secret key
2. **Rate Limiting**: The backend includes rate limiting (10 requests per 15 minutes)
3. **Input Validation**: All form inputs are validated on the backend
4. **CORS**: Properly configured to only allow your frontend domain

## Monitoring and Maintenance

1. **Database**: Monitor MongoDB Atlas usage and performance
2. **API**: Check Vercel function usage and errors
3. **Frontend**: Monitor GitHub Pages deployment status
4. **Updates**: Regularly update dependencies for security

## Cost Considerations

- **GitHub Pages**: Free for public repositories
- **Vercel**: Free tier includes 100GB bandwidth and 100 function invocations per day
- **MongoDB Atlas**: Free tier includes 512MB storage
- **Railway**: Free tier includes $5 monthly credit

This setup provides a production-ready deployment with persistent data storage that will work reliably when deployed to GitHub Pages and other hosting services.