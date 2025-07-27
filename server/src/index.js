import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();

// Allow requests from frontend
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

// Your API routes
app.use('/api/auth', authRoutes);

// ✅ Serve static files from React build
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// ✅ Serve React index.html for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
