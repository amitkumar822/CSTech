# CSTech - Full Stack Task Management System

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
  - [Environment Setup](#environment-setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
  - [Authentication APIs](#authentication-apis)
  - [User Management APIs](#user-management-apis)
  - [Agent Task APIs](#agent-task-apis)
- [Frontend Documentation](#frontend-documentation)
- [Running the Application](#running-the-application)
- [Application Workflow](#application-workflow)
- [Troubleshooting](#troubleshooting)

## Overview
CSTech is a full-stack task management system that enables administrators to distribute tasks among agents and track their completion status. The system features role-based access control, file upload capabilities, and real-time task management.

## Tech Stack

### Backend
- Node.js (v14+)
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- Cookie Parser for secure cookie handling

### Frontend
- React 19 with Vite
- Redux Toolkit & RTK Query
- React Router v7
- Tailwind CSS
- React Toastify
- XLSX for Excel handling

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Git
- npm or yarn
- A text editor (VS Code recommended)

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/yourusername/CSTech.git
cd CSTech
```

2. Install Backend Dependencies
```bash
cd backend
npm install
```

3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Environment Setup

1. Backend Configuration (.env)
```env
PORT=4000
DBNAME=CSTech
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET_KEY=your_jwt_secret_key
JWT_EXPIRES=10d
```

## Project Structure

### Backend Structure
```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middlewares/     # Custom middlewares
│   └── utils/           # Utility functions
├── app.js              # Express app configuration
└── index.js            # Server entry point
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── redux/         # State management
│   └── routers/       # Route configurations
```

## API Documentation

### Authentication APIs

#### 1. Register User
- **Endpoint**: `POST /api/v1/users/register`
- **Access**: Public
- **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "1234567890",
  "password": "securepassword"
}
```
- **Response**:
```json
{
  "statusCode": 201,
  "data": [],
  "message": "User registered successfully",
  "success": true
}
```

#### 2. Login User
- **Endpoint**: `POST /api/v1/users/login`
- **Access**: Public
- **Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```
- **Response**:
```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "agent"
    },
    "token": "jwt_token"
  },
  "message": "User Login Successfully",
  "success": true
}
```

### User Management APIs

#### 1. Get All Agents
- **Endpoint**: `GET /api/v1/users/get-all-agents`
- **Access**: Admin only
- **Headers**: `Cookie: jwtToken=<token>`
- **Response**:
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "agent_id",
      "name": "Agent Name",
      "email": "agent@example.com",
      "role": "agent"
    }
  ],
  "message": "All Agents fetched successfully",
  "success": true
}
```

### Agent Task APIs

#### 1. Upload Task File
- **Endpoint**: `POST /api/v1/agent/upload`
- **Access**: Admin only
- **Headers**: 
  - `Cookie: jwtToken=<token>`
  - `Content-Type: multipart/form-data`
- **Request Body**:
  - `file`: CSV/XLSX file
- **File Format**:
```csv
firstname,phone,notes
John Doe,1234567890,Task details
```
- **Response**:
```json
{
  "statusCode": 200,
  "data": [
    {
      "firstName": "John Doe",
      "phone": "1234567890",
      "notes": "Task details",
      "agentId": "assigned_agent_id",
      "_id": "task_id"
    }
  ],
  "message": "Tasks uploaded successfully",
  "success": true
}
```

#### 2. Get Task Distribution
- **Endpoint**: `GET /api/v1/agent/get-all-tasks`
- **Access**: Admin only
- **Headers**: `Cookie: jwtToken=<token>`
- **Response**:
```json
{
  "statusCode": 200,
  "data": [
    {
      "agent": {
        "_id": "agent_id",
        "name": "Agent Name",
        "email": "agent@example.com"
      },
      "tasks": [
        {
          "_id": "task_id",
          "firstName": "John Doe",
          "phone": "1234567890",
          "notes": "Task details",
          "completed": false
        }
      ]
    }
  ],
  "message": "Successfully Fetched Task Distribution",
  "success": true
}
```

## Running the Application

### Development Mode

1. Start MongoDB
```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
```

2. Start Backend Server
```bash
cd backend
npm run dev
# Server will start on http://localhost:4000
```

3. Start Frontend Development Server
```bash
cd frontend
npm run dev
# Vite server will start on http://localhost:5173
```

### Production Mode

1. Build Frontend
```bash
cd frontend
npm run build
```

2. Start Production Server
```bash
cd backend
npm start
```

## Application Workflow

### 1. Initial Setup
1. Admin registers through `/register` endpoint
2. System automatically assigns admin role to first user

### 2. Admin Workflow
1. Login through `/login` endpoint
2. Access dashboard at `/dashboard`
3. Upload CSV/XLSX file with task data
4. View task distribution among agents
5. Monitor task completion status
6. Manage agents (view/delete)

### 3. Agent Workflow
1. Admin creates agent accounts
2. Agents login through `/login` endpoint
3. View assigned tasks
4. Mark tasks as completed
5. Update profile information

### 4. Task Distribution Process
1. Admin uploads task file
2. System automatically distributes tasks among available agents
3. Agents receive notifications of new tasks
4. Agents can view and manage their tasks

## Troubleshooting

### Common Issues

1. MongoDB Connection Error
```bash
# Check MongoDB service status
# Windows
sc query MongoDB

# Linux/Mac
sudo systemctl status mongod
```

2. CORS Issues
- Verify CORS_ORIGIN in backend .env matches frontend URL
- Check for proper proxy configuration in vite.config.js

3. Authentication Issues
- Clear browser cookies
- Verify JWT_SECRET_KEY in .env
- Check token expiration time

### Error Responses
All API errors follow this format:
```json
{
  "statusCode": 400,
  "message": "Error description",
  "success": false,
  "errors": []
}
```

## Contributing
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request
