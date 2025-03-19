# CSTech - Full Stack Application Documentation

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Frontend Documentation](#frontend-documentation)
  - [Components](#components)
  - [Pages](#pages)
  - [Redux Setup](#redux-setup)
  - [Routing](#routing)
- [Backend Documentation](#backend-documentation)
  - [API Endpoints](#api-endpoints)
  - [Error Handling](#error-handling)
- [Running the Project](#running-the-project)
- [Contributing](#contributing)

## Overview
CSTech is a full-stack web application built with React (Vite) and Node.js that provides user management and agent task handling functionality. The application features authentication, role-based access control, and task management capabilities.

## Tech Stack
### Frontend
- React 19 with Vite
- Redux Toolkit for state management
- React Router v7 for routing
- Tailwind CSS for styling
- Axios for API calls
- React Toastify for notifications

### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads

## Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager
- Git

## Project Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd CSTech
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Environment Variables

### Backend (.env)
Create a `.env` file in the backend directory:
```env
PORT=4000
DBNAME=CSTech
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET_KEY=your_jwt_secret_key
JWT_EXPIRES=10d
COOKIE_EXPIRE=7
```

### Frontend (.env)
Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:4000/api/v1
```

## Project Structure

### Frontend Structure
```
frontend/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # UI elements
│   │   ├── Navbar.jsx
│   │   ├── Loading.jsx
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── dashboard/
│   │   ├── agent/
│   │   └── ...
│   ├── redux/             # Redux state management
│   │   ├── api/
│   │   ├── app/
│   │   └── authSlice.js
│   ├── routers/           # Route configurations
│   │   ├── Router.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── GuestRoute.jsx
│   └── main.jsx          # Application entry point
```

## Frontend Documentation

### Components
Key components include:
- `Navbar`: Main navigation component
- `LoginSignup`: Authentication forms
- `UploadCSV`: CSV file upload functionality
- `Loading`: Loading state component

### Pages
- `/`: Home page
- `/login`: Authentication page
- `/dashboard/*`: Admin dashboard routes
- `/agent/*`: Agent-specific routes

### Redux Setup
The application uses Redux Toolkit for state management:
- `authSlice.js`: Handles authentication state
- `api/`: API integration with RTK Query

### Routing
Protected and guest routes are implemented using:
- `ProtectedRoute.jsx`: Authenticated user routes
- `GuestRoute.jsx`: Non-authenticated user routes

## Backend Documentation

### API Endpoints

#### Authentication
- `POST /api/v1/users/register`: Register new user
- `POST /api/v1/users/login`: User login
- `POST /api/v1/users/logout`: User logout

#### User Management
- `GET /api/v1/users/get-all-agents`: Get all agents (Admin only)
- `PUT /api/v1/users/update/:userId`: Update user profile
- `DELETE /api/v1/users/delete/:id`: Delete user (Admin only)

#### Agent Tasks
- `POST /api/v1/agent/upload`: Upload task file (Admin only)
- `GET /api/v1/agent/get-all-tasks`: Get task distribution (Admin only)
- `GET /api/v1/agent/get-task-by-id/:agentId`: Get agent tasks
- `PUT /api/v1/agent/mark-task-as-completed/:taskId`: Complete task
- `PUT /api/v1/agent/task-delete/:taskId`: Delete task (Admin only)

## Running the Project

### Development Mode

1. Start MongoDB service:
```bash
# Windows
net start MongoDB

# Linux/Mac
sudo service mongod start
```

2. Start the backend server:
```bash
cd backend
npm run dev
# Server will start on http://localhost:4000
```

3. Start the frontend development server:
```bash
cd frontend
npm run dev
# Vite dev server will start on http://localhost:5173
```

### Production Mode

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Start the backend server:
```bash
cd backend
npm start
```

## Application Workflow

1. **Authentication Flow**:
   - Users can register/login through `/login` page
   - JWT token is stored in HTTP-only cookies
   - Protected routes check for authentication

2. **Admin Workflow**:
   - Access dashboard at `/dashboard`
   - Upload CSV/XLSX files for task distribution
   - Manage agents and view task distribution
   - Delete or modify tasks

3. **Agent Workflow**:
   - View assigned tasks
   - Mark tasks as completed
   - Update profile information

## Error Handling
The application uses standardized error responses:
```json
{
  "status": "error",
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

Common error codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
