const express = require('express');
const cookieParser = require('cookie-parser');
const DB = require('./database.js'); // import database functions
const uuid = require('uuid');

const app = express();
const authCookieName = 'token';

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// port
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// API Router
const apiRouter = express.Router();
app.use('/api', apiRouter);

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


// AUTH ENDPOINTS
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;

  if (await DB.getUser(email)) {
    return res.status(409).send({ msg: 'User already exists' });
  }

  const user = await DB.createUser(email, password);
  setAuthCookie(res, user.token);
  res.send({ msg: 'User created successfully' });
});

apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await DB.getUser(email);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = uuid.v4();
    await DB.updateUserToken(email, token);
    setAuthCookie(res, token);
    return res.send({ msg: 'Login successful' });
  }

  res.status(401).send({ msg: 'Invalid email or password' });
});

apiRouter.delete('/auth/logout', (req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// SESSION ENDPOINTS
secureApiRouter.post('/session/create', async (req, res) => {
  const session = await DB.createSession(req.user.email);
  res.send({ sessionCode: session.sessionCode });
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

// RECOMMENDATIONS ENDPOINTS
secureApiRouter.get('/recommendations/:sessionCode', async (req, res) => {
  const { sessionCode } = req.params;
  const session = await DB.getSession(sessionCode);

  if (!session) {
    return res.status(404).send({ msg: 'Session not found' });
  }

  // Return mock movies or integrate with a third-party API
  res.send({
    movies: [
      { id: 1, title: 'Inception', vote_average: 8.8, release_date: '2010-07-16' },
      { id: 2, title: 'The Matrix', vote_average: 8.7, release_date: '1999-03-31' },
      { id: 3, title: 'Interstellar', vote_average: 8.6, release_date: '2014-11-07' },
    ],
  });
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
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
