# Portfolio Application

A modern, full-stack portfolio application built with **Java 21**, **Spring Boot 3.4.8**, **React**, **TypeScript**, and **MySQL**. This application showcases professional experience, skills, projects, education, and provides a contact form for potential collaborations.

![Portfolio Application](https://img.shields.io/badge/Java-21-orange) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.8-green) ![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue) ![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)

## ✨ Features

### 🎨 Frontend
- **Modern React 18** with TypeScript for type safety
- **Responsive Design** with Tailwind CSS
- **Smooth Animations** using Framer Motion
- **Component-based Architecture** with reusable components
- **Mobile-first** responsive design
- **SEO Optimized** with proper meta tags

### 🚀 Backend
- **Java 21** with latest language features
- **Spring Boot 3.4.8** with latest Spring ecosystem
- **Virtual Threads** for enhanced concurrency (Java 21 feature)
- **REST API** with comprehensive endpoints
- **Spring Security** with JWT authentication
- **Spring Data JPA** with Hibernate
- **MySQL** database with optimized schema
- **Docker** containerization ready

### 🎯 Core Sections
- **Hero Section** with professional introduction
- **Experience Timeline** with detailed work history
- **Skills Matrix** categorized by technology type
- **Project Showcase** with live demos and source code links
- **Education Timeline** with academic achievements
- **Contact Form** with email integration

## 🛠️ Technology Stack

### Backend
- **Java 21** (LTS)
- **Spring Boot 3.4.8**
- **Spring Security 6.4.8**
- **Spring Data JPA**
- **MySQL 8.0**
- **Maven 3.9+**
- **Docker**

### Frontend
- **React 18**
- **TypeScript 5.2**
- **Vite** (Build Tool)
- **Tailwind CSS**
- **Framer Motion**
- **Axios** (HTTP Client)
- **Lucide React** (Icons)

### DevOps & Deployment
- **Docker & Docker Compose**
- **Nginx** (Frontend Proxy)
- **MySQL** (Database)
- **Free Cloud Deployment** options

## 🚦 Prerequisites

Before running this application, ensure you have the following installed:

- **Java 21** (JDK 21 or later)
- **Maven 3.6+**
- **Node.js 18+** and **npm**
- **MySQL 8.0+** (or Docker for containerized setup)
- **Git**

## 🏃‍♂️ Quick Start

### Option 1: Docker Compose (Recommended)

1. **Clone the repository**
   git clone https://github.com/yourusername/portfolio-application.git
   cd portfolio-application

2. **Start all services with Docker Compose**
   **docker-compose up --build**

3. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api
- Database Admin: http://localhost:8081 (phpMyAdmin)

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory**
   cd backend

2. **Configure database**
- Create MySQL database: `portfolio_db`
- Update `src/main/resources/application.yml` with your database credentials

3. **Run the Spring Boot application**
   Using Maven
   - mvn spring-boot:run

   Or build and run JAR
   - mvn clean package
   - java -jar target/portfolio-backend-1.0.0.jar

4. **Verify backend is running**
   curl http://localhost:8080/api/portfolio/health


#### Frontend Setup

1. **Navigate to frontend directory**
    cd frontend
2. **Install dependencies**
   npm install
3. **Run the React application**
   npm run dev
4. **Access frontend**
   Open http://localhost:3000 in your browser

## 🗄️ Database Setup

### Automatic Setup (Docker)
When using Docker Compose, the database is automatically initialized with sample data.

### Manual Setup
1. **Create database**
   - CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   - CREATE USER 'portfolio_user'@'%' IDENTIFIED BY 'portfolio_password';
   - GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'%';
   - FLUSH PRIVILEGES;
2. **Run the application**
   Spring Boot will automatically create tables and populate sample data on first run.


## 🌐 API Endpoints

### Public Endpoints
- `GET /api/portfolio/health` - Health check
- `GET /api/portfolio/user/active` - Get active user profile
- `GET /api/portfolio/experience/{userId}` - Get user experience
- `GET /api/portfolio/projects/{userId}` - Get user projects
- `GET /api/portfolio/skills/{userId}` - Get user skills
- `GET /api/portfolio/education/{userId}` - Get user education
- `POST /api/portfolio/contact` - Submit contact message
- `GET /api/portfolio/summary` - Get portfolio summary

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/check-email` - Check if email exists

## 🚀 Deployment Options

### 1. Railway (Recommended for beginners)

#### Backend Deployment
1. Create Railway account at [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Create a new project and select your backend
4. Add environment variables:
   - DB_USERNAME=railway_user
   - DB_PASSWORD=your_password
   - JWT_SECRET=your_jwt_secret
5. Railway will automatically deploy your Spring Boot application

#### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy to Railway or use Netlify/Vercel for static hosting

### 2. Render

#### Backend Deployment
1. Connect GitHub repository to [render.com](https://render.com)
2. Create Web Service
3. Set build command: `mvn clean install`
4. Set start command: `java -jar target/*.jar`
5. Add environment variables for database connection

#### Database Setup
1. Create PostgreSQL database on Render (free tier)
2. Update application.yml for PostgreSQL configuration

### 3. Fly.io

1. Install Fly CLI
2. Initialize project: `fly launch`
3. Deploy: `fly deploy`

## 🔧 Configuration

### Environment Variables

#### Backend

1. **Database**
 - DB_USERNAME=your_db_user
 - DB_PASSWORD=your_db_password
 - DB_HOST=localhost
 - DB_PORT=3306
 - DB_NAME=portfolio_db

2. **Security**
 - JWT_SECRET=your_jwt_secret_key_here

3. **Logging**
 - LOG_LEVEL=INFO

4. **CORS**
 - CORS_ORIGINS=http://localhost:3000,https://yourfrontend.com


#### Frontend

1. **API Configuration**
 - VITE_API_URL=http://localhost:8080/api


## 📊 Sample Data

The application comes with pre-populated sample data including:

- **User Profile**: Debojit Chakraborty's professional information
- **Experience**: Work history at Akamai Technologies and Philips
- **Skills**: Technical skills with proficiency levels
- **Projects**: Sample projects with descriptions and technologies
- **Education**: Academic background from NIT Silchar
- **Contact Messages**: Sample contact form submissions

## 🧪 Testing

### Backend Tests

- cd backend
- mvn test

### Frontend Tests

- cd frontend
- npm test


## 🔒 Security Features

- **CORS Configuration** for cross-origin requests
- **JWT Authentication** for secure API access
- **Input Validation** on all forms
- **SQL Injection Prevention** with JPA
- **XSS Protection** with content security policies
- **HTTPS Enforcement** in production

## 🎨 Customization

### Adding New Sections
1. Create new entity in `backend/src/main/java/com/portfolio/entity/`
2. Add repository interface
3. Create DTO and service classes
4. Add controller endpoints
5. Create React component in `frontend/src/components/`
6. Update API service calls

### Data Customization
- Update `backend/src/main/resources/data.sql` with your information
- Modify sample data to reflect your professional background
- Add your profile images and project screenshots

## 🐛 Troubleshooting

### Common Issues

#### Backend not starting

- Check Java version
  - java --version # Should be 21+

- Check if port 8080 is available
  - lsof -i :8080

- Check database connection
  - mysql -u portfolio_user -p portfolio_db

#### Frontend not starting

- Clear node modules and reinstall
  - rm -rf node_modules package-lock.json
  - npm install

- Check Node version
  - node --version # Should be 18+


## 📝 License

This project is licensed under the MIT License.

## 📞 Support

If you have any questions or issues:

- **Email**: devchakraborty9914@gmail.com
- **LinkedIn**: [Debojit Chakraborty](https://linkedin.com/in/debojit-chakraborty-5b309a132)
- **GitHub Issues**: Create an issue in this repository

---

**Built with ❤️ using Java 21 + Spring Boot 3.4.8 + React + TypeScript**

*This portfolio application demonstrates modern full-stack development practices with the latest technologies.*
