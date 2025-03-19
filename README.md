# CSTech - Backend API Documentation

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [Authentication Endpoints](#authentication-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Agent Task Endpoints](#agent-task-endpoints)
- [Error Handling](#error-handling)
- [Running the Project](#running-the-project)

## Overview
CSTech is a web application that provides user management and agent task handling functionality through a RESTful API.

## Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

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

# Install frontend dependencies (if applicable)
cd ../frontend
npm install
```

## Environment Variables
Create a `.env` file in the backend directory with the following variables:
```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=1d
CORS_ORIGIN=http://localhost:5173
```

## API Documentation

### Base URL
```
http://localhost:4000/api/v1
```

### Authentication Endpoints

#### Register User
- **Endpoint**: `POST /users/register`
- **Request Body**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
- **Response**:
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "string",
      "username": "string",
      "email": "string"
    },
    "token": "string"
  }
}
```

#### Login
- **Endpoint**: `POST /users/login`
- **Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response**:
```json
{
  "status": "success",
  "data": {
    "token": "string",
    "user": {
      "_id": "string",
      "username": "string",
      "email": "string"
    }
  }
}
```

### User Endpoints

#### Get User Profile
- **Endpoint**: `GET /users/profile`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "string",
      "username": "string",
      "email": "string"
    }
  }
}
```

### Agent Task Endpoints

#### Create Task
- **Endpoint**: `POST /agent/tasks`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "title": "string",
  "description": "string",
  "dueDate": "date",
  "priority": "string"
}
```
- **Response**:
```json
{
  "status": "success",
  "data": {
    "task": {
      "_id": "string",
      "title": "string",
      "description": "string",
      "dueDate": "date",
      "priority": "string",
      "status": "string"
    }
  }
}
```

#### Get Tasks
- **Endpoint**: `GET /agent/tasks`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**:
  - `page`: number (optional)
  - `limit`: number (optional)
  - `status`: string (optional)
- **Response**:
```json
{
  "status": "success",
  "data": {
    "tasks": [],
    "totalCount": "number",
    "currentPage": "number"
  }
}
```

## Error Handling
The API uses a standardized error response format:
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

## Running the Project

### Development Mode
1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server (if applicable):
```bash
cd frontend
npm run dev
```

### Production Mode
1. Start the backend server:
```bash
cd backend
npm start
```

2. Build and serve the frontend (if applicable):
```bash
cd frontend
npm run build
npm run start
```

The API will be available at `http://localhost:8000/api/v1`

## API Response Format
All API responses follow this standard format:

### Success Response
```json
{
  "status": "success",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
