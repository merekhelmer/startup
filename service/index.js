// index.js
const express = require('express');
const { peerProxy } = require('./peerProxy.js');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const DB = require('./database.js');

const app = express();
const authCookieName = 'token';

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.set('trust proxy', true);

// Port
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Start the server
const httpServer = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

peerProxy(httpServer);

// API Router
const apiRouter = express.Router();
app.use('/api', apiRouter);

// AUTH ENDPOINTS

// Create a new user
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;
  if (await DB.getUser(email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(email, password);
    setAuthCookie(res, user.token);
    res.send({ id: user._id });
  }
});

// Login a user
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await DB.getUser(email);
  if (user && bcrypt.compareSync(password, user.password)) {
    setAuthCookie(res, user.token);
    res.send({ id: user._id });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Logout a user
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// SECURE API ROUTER
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

// Authenticate the user with a cookie
secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// SESSION ENDPOINTS

// create new session
secureApiRouter.post('/session/create', async (req, res) => {
  const sessionCode = DB.generateSessionCode();
  const session = {
    sessionCode,
    isActive: true,
    createdBy: req.user.email,
    createdAt: new Date(),
    votes: {},
  };
  await DB.createSession(session);
  res.json({ sessionCode });
});

// join existing session
secureApiRouter.post('/session/join', async (req, res) => {
  const { sessionCode } = req.body;
  const session = await DB.getSession(sessionCode);
  if (!session) {
    return res.status(404).send({ msg: 'Session not found' });
  }
  res.send({ msg: 'Joined session successfully' });
});

// active sessions
secureApiRouter.get('/sessions/active', async (req, res) => {
  const sessions = await DB.getActiveSessions();
  res.send(sessions);
});

// utility function to set authentication cookie
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}