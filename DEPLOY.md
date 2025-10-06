# 🚀 Quick Deployment to Vercel

## One-Command Deploy

```bash
vercel --prod
```

## Required Environment Variables on Vercel

Set these in Vercel Dashboard → Settings → Environment Variables:

```bash
MONGODB_URI=mongodb+srv://kanchan:kanchan12213527@cluster0.yq5fuwe.mongodb.net/portfolio
VITE_DJANGO_PORTFOLIO_URL=https://kanchands.pythonanywhere.com
VITE_API_URL=/api
```

## Architecture

- **Frontend**: React + Vite → Static files in `/dist`
- **Backend**: Express serverless functions in `/api`
- **Database**: MongoDB Atlas (shared with Django)

## API Endpoints (Serverless)

- `GET /api/health` - Health check
- `GET /api/profile` - Get profile data
- `GET /api/projects` - Get all projects
- `GET /api/certificates` - Get all certificates
- `GET /api/cv` - Get active CV
- `GET /api/portfolio-data` - Get all data at once

## Local Development

```bash
# Backend (Terminal 1)
cd backend
npm start

# Frontend (Terminal 2)
npm run dev
```

**Note**: For local development, update `.env.local`:
```bash
VITE_API_URL=http://localhost:5001/api
```

## Deployment Flow

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Auto-deploys** via Vercel Git integration

3. **Manual deploy**:
   ```bash
   vercel --prod
   ```

## Verify Deployment

After deployment, test:
- ✅ `https://your-domain.vercel.app` - Frontend
- ✅ `https://your-domain.vercel.app/api/health` - Backend health
- ✅ `https://your-domain.vercel.app/api/projects` - Projects API

## 📚 Full Documentation

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for complete guide.

---

**Happy Deploying! 🎉**
