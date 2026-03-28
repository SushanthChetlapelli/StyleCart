import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const mongoUri =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/stylecart';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection — Compass must use the SAME URI as MONGODB_URI (see server/.env).
// User accounts are stored in database from the URI path (e.g. stylecart) → collection "users".
// Passwords are bcrypt hashes in DB; plain text is never stored.
mongoose.connect(mongoUri)
  .then(() => {
    const dbName = mongoose.connection.name;
    const isLocal =
      /127\.0\.0\.1|localhost/.test(mongoUri) && !mongoUri.includes('mongodb+srv');
    console.log('MongoDB connected successfully');
    console.log(
      `  Database: "${dbName}"  |  Collection: "users"  |  ${isLocal ? 'Local (Docker/host)' : 'Remote (e.g. Atlas)'}`
    );
    if (isLocal) {
      console.log(
        '  In Compass: mongodb://127.0.0.1:27017 → DB "' +
          dbName +
          '" → "users" (accounts), "login_activity" (each signup/login).'
      );
    }
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../dist')));

// Catch all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
