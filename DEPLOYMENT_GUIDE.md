# 🚀 Deployment Guide

## Overview
This guide will help you deploy your Generative Silicon website with:
- **Backend**: Deployed to Vercel
- **Frontend**: Deployed to GitHub Pages
- **Database**: SQLite (ephemeral on Vercel)

## 📋 Prerequisites
1. GitHub account
2. Vercel account (free)
3. Git installed locally

## 🔧 Step 1: Deploy Backend to Vercel

### 1.1 Install Vercel CLI
```bash
npm install -g vercel
```

### 1.2 Login to Vercel
```bash
vercel login
```

### 1.3 Deploy Backend
```bash
cd server
vercel --prod
```

### 1.4 Set Environment Variables in Vercel
Go to your Vercel dashboard and add these environment variables:
- `NODE_ENV`: `production`
- `FRONTEND_URL`: `https://YOUR_USERNAME.github.io/gen-silicon-web`
- `ADMIN_SECRET_KEY`: `your-secure-secret-key`

## 🌐 Step 2: Deploy Frontend to GitHub Pages

### 2.1 Push to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2.2 Enable GitHub Pages
1. Go to your repository settings
2. Scroll to "Pages" section
3. Select "GitHub Actions" as source
4. The workflow will automatically deploy on push to main

### 2.3 Add Repository Secret (Optional)
If you need to change the API URL later:
1. Go to Settings > Secrets and variables > Actions
2. Add `VITE_API_URL` with your Vercel backend URL

## ⚠️ Important Notes

### Database Persistence
- **SQLite on Vercel is ephemeral** - data resets on each deployment
- For persistent data, consider:
  - PlanetScale (MySQL)
  - Supabase (PostgreSQL)
  - MongoDB Atlas

### URLs to Update
Replace these placeholder URLs with your actual URLs:
- `https://gen-silicon-web-server.vercel.app` → Your Vercel backend URL
- `https://salah-elabbassi.github.io/gen-silicon-web` → Your GitHub Pages URL

## 🔍 Testing Deployment

1. **Backend Health Check**:
   ```
   GET https://your-backend.vercel.app/api/health
   ```

2. **Frontend Contact Form**:
   - Visit your GitHub Pages URL
   - Submit a contact form
   - Check if it reaches the backend

3. **Admin Endpoint** (optional):
   ```
   GET https://your-backend.vercel.app/api/contacts?secret=your-admin-secret
   ```

## 🛠️ Troubleshooting

### Common Issues:
1. **CORS Errors**: Check `FRONTEND_URL` in Vercel environment variables
2. **404 on API calls**: Verify the API URL in frontend environment
3. **Database not working**: SQLite resets on Vercel - consider cloud database

### Logs:
- **Vercel**: Check function logs in Vercel dashboard
- **GitHub Pages**: Check Actions tab for build logs

## 🎉 Success!
Once deployed:
- Frontend: `https://YOUR_USERNAME.github.io/gen-silicon-web`
- Backend: `https://your-project.vercel.app`
- Contact forms will work end-to-end!