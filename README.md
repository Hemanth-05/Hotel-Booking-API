# Hotel Booking Application

A full-stack hotel booking application built with React, Node.js, Express, PostgreSQL, Prisma, and JWT-based authentication. The current guest-facing frontend is implemented end to end, while owner and admin functionality is primarily available through backend APIs and is still being expanded on the frontend.

Live Website: https://hotel-booking-six-mu.vercel.app  
API Documentation: https://hotel-booking-api-mv9b.onrender.com/api-docs/

## Project Status

- Guest-facing frontend is complete: room browsing, room details, signup/login, booking creation, booking management, and account updates.
- Role-based backend support is implemented for `GUEST`, `OWNER`, and `ADMIN`.
- Hotel owner and administrator frontend dashboards are still in progress.

## Tech Stack

### Frontend

- React
- React Router
- Vite
- CSS
- Fetch API

### Backend

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT
- bcrypt
- express-validator

### Tools and Deployment

- Swagger / OpenAPI
- Postman
- Render
- Vercel

## Features

### Guest Features

- Sign up and log in
- Browse published rooms
- View individual room details
- Create bookings
- View, edit, and cancel personal bookings
- View and update personal account details
- Persist login state using JWT stored in `localStorage`

### Backend Features

- JWT authentication and password hashing
- Role-based access control for `GUEST`, `OWNER`, and `ADMIN`
- REST APIs for users, hotels, rooms, and bookings
- Input validation using `express-validator`
- Booking rules for date validation, guest capacity checks, total-cost calculation, and overlapping reservation checks
- Swagger API documentation

### In Progress

- Hotel owner frontend dashboard
- Administrator frontend dashboard

## Project Architecture

The project is organized into a React frontend and a layered Express backend:

```text
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── config/
│   ├── App.jsx
│   └── main.jsx

src/
├── routes/
├── controllers/
├── services/
├── respositories/
├── middleware/
├── config/
└── server.js

prisma/
├── schema.prisma
├── migrations/
└── seed.js
```

## Authentication and Authorization

- Users sign up and log in with email and password
- Passwords are hashed before storage
- JWT tokens are issued on successful login
- Frontend login state is restored through `/api/users/me`
- Protected backend endpoints require a valid `Authorization: Bearer <token>` header
- Role checks restrict access to guest, owner, and admin operations

## API Documentation

Swagger UI:  
https://hotel-booking-api-mv9b.onrender.com/api-docs/

Note: Swagger may default to the local server. Use the server selector in Swagger UI to switch to the production server when testing the deployed API.

## Deployment

- Frontend: Vercel
- Backend API: Render
- Production API Base URL: `https://hotel-booking-api-mv9b.onrender.com/api`

## Setup and Run Locally

### Prerequisites

- Node.js v18 or higher
- PostgreSQL
- npm

### 1. Clone the repository

```bash
git clone https://github.com/Hemanth-05/Hotel-Booking-API.git
cd Hotel-Booking-API
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd client
npm install
cd ..
```

### 4. Configure environment variables

Backend `.env`

```env
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=59m
PORT=3000
CLIENT_URL=http://localhost:5173
```

Frontend `client/.env`

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 5. Run database migrations

```bash
npx prisma migrate dev
```

### 6. Start the backend

```bash
npm run dev
```

### 7. Start the frontend

In a second terminal:

```bash
cd client
npm run dev
```

## Team Collaboration

This project began as a collaborative backend project with multiple contributors working through feature branches and pull requests. The React frontend has been added on top of that foundation to turn the system into a complete guest-facing booking application.

## Feedback

Feel free to explore the application, review the API, or share feedback.
