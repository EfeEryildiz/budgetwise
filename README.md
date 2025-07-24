# 💸 BudgetWise

BudgetWise is a full-stack budgeting app designed to help users take control of their finances by registering, logging in, and securely tracking their expenses. Built with a modern tech stack and clean architecture, this project is scalable, maintainable, and ready for deployment.

---

## 🚀 Tech Stack

### Frontend (Client)
- **React** with **TypeScript**
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

budgetwise/
├── client/ # React frontend
└── server/ # Express backend

---

## 🛠️ Getting Started

### 1. Clone the repository

📦 Setup Instructions
🔹 Server (Backend)
```bash
git clone https://github.com/EfeEryildiz/budgetwise.git
cd budgetwise
Copy
Edit
cd server
npm install
Create a .env file in /server:

env
Copy
Edit
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
Run the server:

bash
Copy
Edit
npm run dev
