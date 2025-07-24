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

###📦 Setup Instructions

🔹 Server (Backend)
```bash
git clone https://github.com/EfeEryildiz/budgetwise.git
cd budgetwise
```


####🔹 Server (Backend)
```bash
cd server
npm install
```
Create a .env file in /server:

```env
Copy
Edit
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
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

Create a .env file in /client (optional):
```env
VITE_API_URL=http://localhost:
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
