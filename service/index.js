// service/index.js
const express = require('express');
const { peerProxy } = require('./peerProxy.js');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const DB = require('./database.js');

const app = express();
const authCookieName = 'token';

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.set('trust proxy', true);

const port = process.argv.length > 2 ? process.argv[2] : 4000;

const httpServer = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

peerProxy(httpServer);

const apiRouter = express.Router();
app.use('/api', apiRouter);

// AUTH ENDPOINTS
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;
  if (await DB.getUser(email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(email, password);
    res.status(201).send({ msg: 'User created', user });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await DB.getUser(email);
  if (user && await bcrypt.compare(password, user.password)) {
    res.cookie(authCookieName, user.token, { httpOnly: true, sameSite: 'strict' });
    res.status(200).send({ msg: 'Login successful' });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

apiRouter.post('/auth/logout', (req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// middleware to verify authentication
apiRouter.use(async (req, res, next) => {
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
apiRouter.post('/session/create', async (req, res) => {
  try {
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
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).send({ msg: 'Internal Server Error' });
  }
});

apiRouter.post('/session/join', async (req, res) => {
  try {
    const { sessionCode } = req.body;
    const session = await DB.getSession(sessionCode);
    if (!session) {
      return res.status(404).send({ msg: 'Session not found' });
    }
    res.send({ msg: 'Joined session successfully' });
  } catch (error) {
    console.error('Error joining session:', error);
    res.status(500).send({ msg: 'Internal Server Error' });
  }
});

apiRouter.get('/sessions/active', async (req, res) => {
  try {
    const sessions = await DB.getActiveSessions();
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching active sessions:', error);
    res.status(500).send({ msg: 'Internal Server Error' });
  }
});

apiRouter.post('/session/preferences', async (req, res) => {
  try {
    const { sessionCode, mood, genres } = req.body;
    const session = await DB.getSession(sessionCode);
    if (!session) {
      return res.status(404).send({ msg: 'Session not found' });
    }
    await DB.addPreferencesToSession(sessionCode, { mood, genres });
    res.send({ msg: 'Preferences submitted successfully' });
  } catch (error) {
    console.error('Error submitting preferences:', error);
    res.status(500).send({ msg: 'Internal Server Error' });
  }
});

apiRouter.get('/recommendations/:sessionCode', async (req, res) => {
  try {
    const { sessionCode } = req.params;
    const session = await DB.getSession(sessionCode);
    if (!session) {
      return res.status(404).send({ msg: 'Session not found' });
    }

    // placeholder
    const recommendations = [
      { id: '1', title: 'Movie 1', vote_average: 8.5, release_date: '2021-01-01' },
      { id: '2', title: 'Movie 2', vote_average: 7.8, release_date: '2020-05-15' },
      { id: '3', title: 'Movie 3', vote_average: 9.0, release_date: '2019-11-20' },
    ];

    res.json({ movies: recommendations });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).send({ msg: 'Internal Server Error' });
  }
});


apiRouter.post('/session/movies', async (req, res) => {
  try {
    const { sessionCode, movie } = req.body;
    if (!movie || !movie.imdbID) {
      return res.status(400).send({ msg: 'Invalid movie data' });
    }
    const session = await DB.getSession(sessionCode);
    if (!session) {
      return res.status(404).send({ msg: 'Session not found' });
    }
    await DB.addMovieToSession(sessionCode, movie);
    res.send({ msg: 'Movie added successfully' });
  } catch (error) {
    console.error('Error adding movie to session:', error);
    res.status(500).send({ msg: 'Internal Server Error' });
  }
});


apiRouter.get('/session/:sessionCode/movies', async (req, res) => {
  try {
    const { sessionCode } = req.params;
    const session = await DB.getSession(sessionCode);
    if (!session) {
      return res.status(404).send({ msg: 'Session not found' });
    }
    res.json({ movies: session.movies || [] });
  } catch (error) {
    console.error('Error fetching session movies:', error);
    res.status(500).send({ msg: 'Internal Server Error' });
  }
});

apiRouter.post('/vote', async (req, res) => {
  try {
    const { sessionCode, movieId } = req.body;
    if (!movieId) {
      return res.status(400).send({ msg: 'Movie ID is required' });
    }
    const session = await DB.getSession(sessionCode);
    if (!session) {
      return res.status(404).send({ msg: 'Session not found' });
    }
    await DB.addVote(sessionCode, movieId);
    res.send({ msg: 'Vote recorded successfully' });
  } catch (error) {
    console.error('Error recording vote:', error);
    res.status(500).send({ msg: 'Internal Server Error' });
  }
});

// service/index.js
apiRouter.get('/results/:sessionCode', async (req, res) => {
  try {
    const { sessionCode } = req.params;
    const session = await DB.getSession(sessionCode);
    if (!session) {
      return res.status(404).send({ msg: 'Session not found' });
    }

    const votes = session.votes || {};
    // sort movies by votes in descending order
    const results = Object.keys(votes)
      .map((movieId) => ({
        movieId,
        votes: votes[movieId],
      }))
      .sort((a, b) => b.votes - a.votes);

    res.json({ results });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).send({ msg: 'Internal Server Error' });
  }
});