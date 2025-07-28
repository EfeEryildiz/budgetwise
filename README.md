# 💸 BudgetWise

BudgetWise is a full-stack budgeting app designed to help users take control of their finances by registering, logging in, and securely tracking their expenses. Built with a modern tech stack and clean architecture, this project is scalable, maintainable, and ready for deployment.

---

## 🚀 Tech Stack

### Frontend (Client)
- **React** with **TypeScript**
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for routing
- **Axios** for API calls
- **React Toastify** for notifications

### Backend (Server)
- **Node.js** with **Express**
- **TypeScript**
- **Prisma** ORM
- **PostgreSQL** (or SQLite during dev)
- **bcrypt** for password hashing
- **dotenv** for environment variables
- **CORS** and **cookie-parser**

---

## 🖥️ Project Structure

```
budgetwise/
├── client/ # React frontend
└── server/ # Express backend
```
---

## 🛠️ Getting Started

📦 Setup Instructions

🔹 Clone the Repository
```bash
git clone https://github.com/EfeEryildiz/budgetwise.git
cd budgetwise
```

🔹 Server (Backend)
```bash
cd server
npm install
```
Create a .env file in /server (copy from .env.example):

```env
DATABASE_URL="postgresql://username:password@localhost:5432/budgetwise"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
FRONTEND_URL="https://your-frontend-domain.com"
PORT=8080
NODE_ENV="development"
```

Run Prisma migrations:
```bash
npx prisma migrate dev
npx prisma generate
```

Run the server:
```bash
npm run dev
```

🔹 Client (Frontend)
```bash
cd client
npm install
```

Create a .env file in /client (copy from .env.example):
```env
VITE_API_URL="http://localhost:8080"
```

Run the frontend:
```bash
npm run dev
```

## 🔐 Features
- User registration & login (with secure hashed passwords)

- Persistent session via cookies

- Frontend protected routes

- Toast notifications for user feedback

- CORS and credential support across client/server

## 🧪 Coming Soon
- Persistent session via cookies

- Expense tracking with graphs

- Monthly summaries

- JWT token refresh

## 📤 Deployment
- Frontend: Deploy with Netlify or Vercel

- Backend: Deploy with Render, Railway, or Fly.io

- Use environment variables from your local .env setup

## 👤 Author
Developed by Efe Eryildiz
