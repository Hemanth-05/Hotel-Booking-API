# 🏨 Hotel Booking API

A RESTful backend API for managing hotel rooms, users, and bookings, built using **Node.js, Express, PostgreSQL, Prisma, and JWT-based authentication**.  
This project was developed as a **collaborative team project**, following clean backend architecture and industry-standard GitHub workflows.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Postman (API Testing)
- Swagger / OpenAPI (API Documentation)
- Render (Deployment)

---

## 📌 Features

- Secure user signup and login
- JWT-based authentication and authorization
- Role-based access control
- Rooms CRUD operations
- Booking functionality with validations
- Clean and scalable backend architecture
- API documentation using Swagger
- API testing using Postman environments
- Deployed and accessible via a public API endpoint

---

## 🧱 Project Architecture
The project follows a clean separation of concerns:
src/
├── routes/ # API routes
├── controllers/ # Request handling and responses
├── services/ # Business logic
├── repositories/ # Database access layer
├── middlewares/ # Authentication and validations
├── prisma/ # Prisma schema and migrations
└── app.js # Express app configuration


---

## 🔐 Authentication

- Users can sign up and log in securely
- Passwords are hashed before being stored
- JWT tokens are issued upon successful authentication
- Protected routes require a valid JWT

---

## 🔄 GitHub Workflow

This project follows industry-standard GitHub practices:

- Feature-specific branches
- No direct commits to the `main` branch
- Pull Requests for every feature
- Code reviews before merging
- Safe and conflict-free merges

---

## 🧪 API Testing

- Postman environments are used for local and deployed testing
- Environment variables manage JWT tokens and configurations
- Endpoints were tested collaboratively after development

---

## 📖 API Documentation

> ⚠️ **Note:**  
> The Swagger UI defaults to the **Local server**.  
> Please use the server dropdown (top-left in Swagger) and switch to the **Production server** to test the deployed API.


**Swagger UI:**  
https://hotel-booking-api-mv9b.onrender.com/api-docs/

---

## 🌐 Deployment

The API is deployed on Render.

**Base URL:**  
https://hotel-booking-api-mv9b.onrender.com

---

## ⚙️ Setup and Run Locally

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- npm

### Steps

```bash
git clone https://github.com/Hemanth-05/Hotel-Booking-API.git
cd your-repo
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

## 🤝 Team Collaboration
This project was built collaboratively with multiple contributors working in parallel.
Clear communication, structured workflows, and code reviews were key to maintaining code quality and ensuring smooth integration.

## 📬 Feedback
Feel free to explore the API, review the codebase, or share feedback.


