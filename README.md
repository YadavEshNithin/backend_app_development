 Task Management API - Backend Intern Assignment

A full-stack task management application with secure authentication, role-based access control, and RESTful APIs.

## 🚀 Features

### Backend
- JWT Authentication & Authorization
- Role-Based Access Control (User/Admin)
- Task CRUD Operations
- RESTful API with proper status codes
- Input Validation & Security Middleware
- API Documentation (Swagger)

### Frontend
- React.js with Modern Hooks
- User Registration & Login
- Protected Routes & Dashboard
- Task Management Interface
- Responsive Design

## 📦 Installation

### Backend Setup

cd backend-api/src
npm install
cp .env.example .env
# Update .env with your MongoDB URI
npm run dev
Server runs on http://localhost:3000

Frontend Setup
bash
cd frontend
npm install
npm run dev
Frontend runs on http://localhost:5173

🔧 Environment Variables
Backend (.env)
env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/backend_api
JWT_SECRET=your_jwt_secret_key
📚 API Endpoints
Authentication
POST /api/v1/auth/register - User registration

POST /api/v1/auth/login - User login

GET /api/v1/auth/me - Get user profile

Tasks
GET /api/v1/tasks - Get user's tasks

POST /api/v1/tasks - Create task

PUT /api/v1/tasks/:id - Update task

DELETE /api/v1/tasks/:id - Delete task

Admin
GET /api/v1/admin/users - Get all users (Admin only)

GET /api/v1/admin/tasks - Get all tasks (Admin only)

🎯 Usage
Register a new user at /register

Login with your credentials at /login

Access Dashboard and manage tasks

Create, edit, delete tasks in the task manager

View API Docs at http://localhost:3000/api-docs

📁 Project Structure
text
backend-api/src/
├── models/          # User & Task models
├── routes/          # API routes
├── middleware/      # Auth & validation
└── server.js        # Main server

frontend/src/
├── components/      # React components
├── services/        # API calls
└── App.jsx          # Main app


🚀 Deployment Ready
Environment-based configuration

Error handling middleware

Scalable project structure

API versioning

Comprehensive documentation
# backend_app_development
