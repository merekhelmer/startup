const express = require('express');
const {peerProxy} = require('./peerProxy.js');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const DB = require('./database.js'); // import database functions
const uuid = require('uuid');
const {mockMovies} = require('./mockData.js');

const app = express();
const authCookieName = 'token';

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// port
const port = process.argv.length > 2 ? process.argv[2] : 4000;

//start the server
const httpServer = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// websocket proxy
peerProxy(httpServer);

// API Router
app.set('trust proxy', true);
const apiRouter = express.Router();
app.use('/api', apiRouter);

// AUTH ENDPOINTS
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;

  if (await DB.getUser(email)) {
    return res.status(409).send({ msg: 'User already exists' });
  }

  const user = await DB.createUser(email, password);
  setAuthCookie(res, user.token);
  res.send({ msg: 'User created successfully', id: user._id });
});


apiRouter.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await DB.getUser(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = uuid.v4();
      await DB.updateUserToken(email, token);
      setAuthCookie(res, token);
      return res.status(200).json({ id: user._id, token });
    } else {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});


apiRouter.delete('/auth/logout', (req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// SECURE API ROUTER
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

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
secureApiRouter.post('/session/create', async (req, res) => {
  const session = await DB.createSession(req.user.email);
  res.send({ sessionCode: session.sessionCode });
});

secureApiRouter.post('/session/join', async (req, res) => {
  const { sessionCode } = req.body;
  const session = await DB.getSession(sessionCode);

  if (!session) {
    return res.status(404).send({ msg: 'Session not found' });
  }

  res.send({ msg: 'Joined session successfully' });
});

secureApiRouter.post('/session/preferences', async (req, res) => {
  const { sessionCode, mood, genres } = req.body;
  const session = await DB.getSession(sessionCode);

  if (!session) {
    return res.status(404).send({ msg: 'Session not found' });
  }

  await DB.addPreferencesToSession(sessionCode, { mood, genres });
  res.send({ msg: 'Preferences saved' });
});


apiRouter.get('/recommendations/:sessionCode', async (req, res) => {
  const { sessionCode } = req.params;

  try {
    const session = await DB.getSession(sessionCode);
    if (!session) {
      return res.status(404).send({ msg: 'Session not found' });
    }

    res.send({ movies: mockMovies });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).send({ msg: 'Internal Server Error' });
  }
});


// VOTE ENDPOINTS
secureApiRouter.post('/vote', async (req, res) => {
  const { sessionCode, movieId } = req.body;
  const session = await DB.getSession(sessionCode);

  if (!session) {
    return res.status(404).send({ msg: 'Session not found' });
  }

  await DB.addVote(sessionCode, movieId);
  res.send({ msg: 'Vote recorded' });
});

// RESULTS ENDPOINTS
secureApiRouter.get('/results/:sessionCode', async (req, res) => {
  const { sessionCode } = req.params;
  const session = await DB.getSession(sessionCode);

  if (!session) {
    return res.status(404).send({ msg: 'Session not found' });
  }

  const sortedVotes = Object.entries(session.votes || {})
    .sort(([, a], [, b]) => b - a)
    .map(([movieId, votes]) => ({ movieId, votes }));

  res.send(sortedVotes);
});

// UTILITY FUNCTIONS
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true, // 
    httpOnly: true, 
    sameSite: 'strict', 
  });
}
