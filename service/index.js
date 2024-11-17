// service/index.js
import express from 'express';
import { v4 as uuid } from 'uuid';

const app = require('express');
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API Router
const apiRouter = express.Router();
app.use('/api', apiRouter);

// In-memory STORAGE
let users = {};
let sessions = {};
let preferences = {};

// ENDPOINTS //

//Create a new user
apiRouter.post('/auth/create', (req, res) => {
    const { email, password } = req.body;
  
    // Check if the user already exists
    if (users[email]) {
      return res.status(409).send({ msg: 'User already exists' });
    }
  
    // Create new user
    const user = { email, password, token: uuid.v4() };
    users[email] = user;
  
    res.send({ token: user.token });
  });

// Login an existing user
apiRouter.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
  
    const user = users[email];
    if (user && user.password === password) {
      user.token = uuid.v4(); // Refresh token for this session
      return res.send({ token: user.token });
    }
  
    res.status(401).send({ msg: 'Invalid email or password' });
  });

// Logout a user
apiRouter.delete('/auth/logout', (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    if (user) {
      delete user.token;
    }
    res.status(204).end();
  });

// Create a New Session
apiRouter.post('/session/create', (req, res) => {
    const { userToken } = req.body;
  
    const user = Object.values(users).find((u) => u.token === userToken);
    if (!user) return res.status(401).send({ msg: 'Unauthorized' });
  
    const sessionCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    sessions[sessionCode] = { creator: user.email, preferences: [], votes: {} };
  
    res.send({ sessionCode });
  });

// Serve static files
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
