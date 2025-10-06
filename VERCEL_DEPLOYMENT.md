# 🚀 Vercel Deployment Guide for MERN Portfolio

This guide will help you deploy your MERN stack portfolio to Vercel with serverless backend functions.

## 📋 Prerequisites

- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas database (already configured)
- Git repository connected to Vercel

## 🔧 Project Structure

```
Portfolio/
├── api/                    # Serverless backend functions
│   ├── index.js           # Main API handler
│   └── package.json       # API dependencies
├── src/                   # React frontend
├── dist/                  # Build output
├── vercel.json           # Vercel configuration
└── .env.local            # Local environment variables
```

## 📝 Step-by-Step Deployment

### 1. **Update Environment Variables on Vercel**

Go to your Vercel project dashboard → Settings → Environment Variables

Add the following variables:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://kanchan:kanchan12213527@cluster0.yq5fuwe.mongodb.net/portfolio` | Your MongoDB connection string |
| `VITE_DJANGO_PORTFOLIO_URL` | `https://kanchands.pythonanywhere.com` | Django portfolio URL |
| `VITE_API_URL` | `/api` | API base URL (relative path) |

### 2. **Vercel Configuration** (`vercel.json`)

The project is already configured with:
- ✅ Static frontend build
- ✅ Serverless backend API at `/api/*`
- ✅ SPA routing with fallback to `index.html`
- ✅ MongoDB connection caching for performance

### 3. **Deploy to Vercel**

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

#### Option B: Using Git Integration

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```

2. Vercel will automatically deploy on every push to main branch

### 4. **Verify Deployment**

After deployment, test these endpoints:

1. **Frontend**: `https://your-project.vercel.app`
2. **API Health**: `https://your-project.vercel.app/api/health`
3. **Projects**: `https://your-project.vercel.app/api/projects`
4. **Certificates**: `https://your-project.vercel.app/api/certificates`

## 🏗️ Architecture

### Frontend
- Built with Vite + React
- Deployed as static files
- Uses SPA routing

### Backend
- Express.js serverless functions
- Runs on Vercel's Node.js runtime
- MongoDB connection with caching for performance
- CORS enabled for all origins

### Database
- MongoDB Atlas (shared cluster)
- Managed through Django admin panel
- Accessed by both Django and MERN apps

## 🔄 Local Development

### Running Locally

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

**Access:**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5001`

### Environment Variables for Local Development

Update `.env.local`:
```bash
VITE_API_URL=http://localhost:5001/api
VITE_DJANGO_PORTFOLIO_URL=https://kanchands.pythonanywhere.com
```

## 🐛 Troubleshooting

### Issue: API calls failing in production

**Solution:** Ensure `MONGODB_URI` is set in Vercel environment variables

### Issue: CORS errors

**Solution:** The API is configured to allow all origins (`origin: '*'`). If you need to restrict, update `api/index.js`

### Issue: MongoDB connection timeouts

**Solution:** 
1. Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
2. Check if connection string is correct
3. Ensure MongoDB cluster is active

### Issue: 404 on API routes

**Solution:** Ensure `vercel.json` routes are correctly configured

### Issue: Environment variables not working

**Solution:** 
1. Redeploy after adding environment variables
2. Environment variables must start with `VITE_` for frontend
3. Backend variables don't need the prefix

## 📊 Performance Optimization

### Implemented:
- ✅ MongoDB connection caching (prevents reconnection on every request)
- ✅ Serverless functions (auto-scaling)
- ✅ Static asset caching
- ✅ Optimized bundle size with Vite

### Recommendations:
- Use CDN for images (e.g., Cloudinary, AWS S3)
- Enable Vercel's image optimization
- Add Redis caching for frequently accessed data (optional)

## 🔐 Security

### Current Setup:
- ✅ Environment variables for sensitive data
- ✅ CORS configured
- ✅ MongoDB connection over SSL
- ✅ No API keys exposed in frontend

### Recommendations:
- Consider adding rate limiting for API endpoints
- Add authentication for admin operations (if needed)
- Use Vercel's Web Application Firewall (Enterprise plan)

## 📦 Deployment Checklist

Before deploying, ensure:

- [ ] All environment variables are set in Vercel
- [ ] MongoDB Atlas allows connections from anywhere
- [ ] Django portfolio URL is correct
- [ ] All dependencies are in package.json
- [ ] Build script works locally (`npm run build`)
- [ ] API endpoints tested locally
- [ ] vercel.json is properly configured
- [ ] .gitignore includes .env files

## 🎯 Post-Deployment

After successful deployment:

1. ✅ Test all pages (Home, About, Projects, Certificates, Contact)
2. ✅ Verify data loads from MongoDB
3. ✅ Check Django portfolio banner appears
4. ✅ Test mobile responsiveness
5. ✅ Verify all links work
6. ✅ Test form submissions (Contact page)

## 📞 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check browser console for errors
3. Test API endpoints directly in browser
4. Verify MongoDB Atlas dashboard for connection issues

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vite Documentation](https://vitejs.dev/)

---

**🎉 Your MERN portfolio is now deployed on Vercel with serverless backend!**
