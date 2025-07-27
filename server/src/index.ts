import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // during development
  credentials: true,
}));

app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);

// === Serve React frontend in production ===
const __dirnamePath = path.resolve(); // workaround since __dirname is not available in ESM
app.use(express.static(path.join(__dirnamePath, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirnamePath, 'client', 'build', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
