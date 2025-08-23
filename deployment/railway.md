# Railway Deployment Guide

## Backend Deployment

1. **Connect GitHub Repository**
   - Install Railway CLI
     - npm install -g @railway/cli

   - Login to Railway
     - railway login

2. **Create New Project**
   - railway new portfolio-backend
   - cd backend

3. **Configure Environment Variables**
   - railway variables set DB_USERNAME=railway_user
   - railway variables set DB_PASSWORD=secure_password
   - railway variables set JWT_SECRET=your_jwt_secret
   - railway variables set CORS_ORIGINS=https://yourfrontend.railway.app

4. **Deploy**
   - railway up


## Database Setup
Railway automatically provisions MySQL database:
- Database URL is auto-injected as `DATABASE_URL`
- Connection details available in Railway dashboard

## Frontend Deployment
1. Build locally: `npm run build`
2. Deploy to Netlify/Vercel with build folder
3. Set `VITE_API_URL` to your Railway backend URL

## 🎯 Access Your Swagger UI

After starting the application, you can access:

- Swagger UI: http://localhost:8080/api/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/api/v3/api-docs
- API Health: http://localhost:8080/api/actuator/health

## 🚀 Quick Deployment Commands

# Development
- docker-compose up --build

# Production
- docker-compose -f docker-compose.prod.yml up --build

# Background mode
- docker-compose up -d --build

# View logs
- docker-compose logs -f backend
- docker-compose logs -f frontend

# Stop all services
- docker-compose down

# Clean rebuild
- docker-compose down -v
- docker-compose up --build



