import express from 'express';
import { setupAuth } from '../server/auth.js';
import session from 'express-session';
import { storage } from '../server/storage.js';

const app = express();
app.use(express.json());

// Session setup
const sessionSettings = {
  secret: process.env.SESSION_SECRET || "default-secret-key-for-development",
  resave: false,
  saveUninitialized: false,
  store: storage.sessionStore,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }
};

app.use(session(sessionSettings));

// Setup authentication routes
setupAuth(app);

export default app;