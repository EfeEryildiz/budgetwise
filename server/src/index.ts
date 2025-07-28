import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';

dotenv.config();
const app = express();

const corsOrigin = process.env.NODE_ENV === 'production' 
  ? process.env.FRONTEND_URL 
  : 'http://localhost:5173';

app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);

// 🛠 VITE USES 'dist' NOT 'build'
const __dirnamePath = path.resolve();
app.use(express.static(path.join(__dirnamePath, 'client', 'dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirnamePath, 'client', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
