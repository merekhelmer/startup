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

/// Create a New Session
apiRouter.post('/session/create', (req, res) => {
    const { userToken } = req.body;
  
    const user = Object.values(users).find((u) => u.token === userToken);
    if (!user) return res.status(401).send({ msg: 'Unauthorized' });
  
    const sessionCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    sessions[sessionCode] = { creator: user.email, preferences: [], votes: {} };
    console.log('Sessions:', sessions);

  
    res.send({ sessionCode });
  });


// Join an existing session
apiRouter.post('/session/join', (req, res) => {
  const { sessionCode, userToken } = req.body;

  const session = sessions[sessionCode];
  if (!session) {
    return res.status(404).send({ msg: 'Session not found' });
  }

  // validate user
  const user = Object.values(users).find((u) => u.token === userToken);
  if (!user) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }

  res.send({ msg: `Successfully joined session: ${sessionCode}` });
});

  
// Submit Preferences
apiRouter.post('/session/preferences', (req, res) => {
    const { sessionCode, mood, genres } = req.body;
  
    const session = sessions[sessionCode];
    if (!session) return res.status(404).send({ msg: 'Session not found' });
  
    session.preferences.push({ mood, genres });
    res.send({ msg: 'Preferences saved' });
  });


// Get Movie Recommendations
// mock data for recommendations
const mockMovies = [
  { id: 1, title: "Movie 1", vote_average: 8.5, release_date: "2021-05-15" },
  { id: 2, title: "Movie 2", vote_average: 7.8, release_date: "2020-10-30" },
  { id: 3, title: "Movie 3", vote_average: 9.1, release_date: "2019-08-20" },
];

apiRouter.get('/recommendations/:sessionCode', (req, res) => {
  const { sessionCode } = req.params;

  const session = sessions[sessionCode];
  if (!session) {
    return res.status(404).send({ msg: 'Session not found' });
  }

  // return mock movie recommendations
  res.send({ movies: mockMovies });
});

// Submit Vote
apiRouter.post('/vote', (req, res) => {
    const { sessionCode, movieId } = req.body;
  
    const session = sessions[sessionCode];
    if (!session) return res.status(404).send({ msg: 'Session not found' });
  
    session.votes[movieId] = (session.votes[movieId] || 0) + 1;
  
    res.send({ msg: 'Vote recorded' });
  });
  
// Get Results
apiRouter.get('/results/:sessionCode', (req, res) => {
    const sessionCode = req.params.sessionCode;
  
    const session = sessions[sessionCode];
    if (!session) return res.status(404).send({ msg: 'Session not found' });
  
    const sortedVotes = Object.entries(session.votes || {})
      .sort(([, a], [, b]) => b - a)
      .map(([movieId, votes]) => ({ movieId, votes }));
  
    res.send(sortedVotes);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
