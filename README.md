# Generative Silicon Website

A modern, animated website for Generative Silicon - a cutting-edge startup revolutionizing the semiconductor industry through generative AI. The website showcases AI-powered ASIC design solutions with beautiful animations and a fully functional contact system.

## 🚀 Features

- **Modern React Frontend**: Built with React 19 and Vite for optimal performance
- **Beautiful Animations**: CSS keyframe animations with staggered entrance effects
- **Responsive Design**: Mobile-first design that works on all devices
- **Contact Form**: Fully functional contact form with backend integration
- **Admin Panel**: Hidden admin panel to view contact submissions
- **Database Integration**: MongoDB backend for persistent data storage
- **Production Ready**: Configured for deployment on GitHub Pages with backend API

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- CSS3 with custom animations
- Responsive design

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS and security middleware
- Rate limiting

### Deployment
- Frontend: GitHub Pages
- Backend: Vercel/Railway
- Database: MongoDB Atlas

## 🎨 Animations

The website features comprehensive animations including:
- Fade-in effects with directional movement
- Staggered entrance animations
- Floating and glow effects
- Hover animations on interactive elements
- Smooth transitions throughout

## 📱 Sections

1. **Hero Section**: Eye-catching introduction with key statistics
2. **Services**: ASIC Design, Verification, DFT Services, Physical Design
3. **Solutions**: AI-powered verification automation highlights
4. **About**: Company information and mission
5. **Contact**: Functional contact form with validation
6. **Admin Panel**: Hidden panel for viewing submissions

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Local Development

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd gen_silicon_web
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Set up backend** (optional for local development):
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI
   npm run dev
   ```

4. **Start frontend development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**: Navigate to `http://localhost:5173`

## 🌐 Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deployment Summary

1. **Backend**: Deploy to Vercel/Railway with MongoDB Atlas
2. **Frontend**: Push to GitHub and enable GitHub Pages
3. **Environment Variables**: Set API URL in GitHub repository secrets

## 🔧 Configuration

### Environment Variables

**Frontend** (`.env.local`):
```env
VITE_API_URL=http://localhost:3001
```

**Backend** (`server/.env`):
```env
MONGODB_URI=your-mongodb-connection-string
FRONTEND_URL=http://localhost:5173
ADMIN_SECRET_KEY=your-secret-key
```

## 🎯 Admin Panel

Access the admin panel to view contact form submissions:

1. Add `?admin=true` to the URL, or
2. Triple-click the footer copyright text
3. Enter the admin secret key when prompted

## 📁 Project Structure

```
gen_silicon_web/
├── src/
│   ├── App.jsx          # Main React component
│   ├── App.css          # Styles and animations
│   ├── assets/          # Images and static files
│   └── ...
├── server/              # Backend API
│   ├── server.js        # Express server
│   ├── package.json     # Backend dependencies
│   └── ...
├── .github/workflows/   # GitHub Actions for deployment
├── DEPLOYMENT.md        # Detailed deployment guide
└── README.md           # This file
```

## 🎨 Customization

### Colors and Branding
Edit the CSS custom properties in `src/App.css`:
```css
:root {
  --primary-color: #8b5cf6;
  --secondary-color: #06b6d4;
  /* ... */
}
```

### Content
Update the content in `src/App.jsx` to match your company information.

### Animations
Modify or add new animations in `src/App.css` using CSS keyframes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or support, please contact:
- Email: salah.eddine.seecs@gmail.com
- Phone: +212 6 20 41 03 17

---

**Built with ❤️ for the future of semiconductor design**
