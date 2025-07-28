import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth';

dotenv.config();
const app = express();

const corsOrigin = process.env.NODE_ENV === 'production' 
  ? process.env.FRONTEND_URL 
  : 'http://localhost:3000';

app.use(cors({ origin: corsOrigin, credentials: true })); // ← ADD THIS LINE
app.use(express.json());
app.use('/api/auth', authRoutes);

// 🛠 Fix: correct path to React build folder
const __dirnamePath = path.resolve();
app.use(express.static(path.join(__dirnamePath, 'client', 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirnamePath, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));