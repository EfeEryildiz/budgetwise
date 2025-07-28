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

// API routes first
app.use('/api/auth', authRoutes);

// Serve static files - use __dirname for proper path resolution in production
const clientPath = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientPath));

// Simple fallback without wildcards
app.use((req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(clientPath, 'index.html'));
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
