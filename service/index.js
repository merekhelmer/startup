// service/index.js
const express = require('express');
const uuid = require('uuid');
const app = express();

// In-memory STORAGE
let users = {};
let sessions = {};
let preferences = {};

// Port
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API Router
const apiRouter = express.Router();
app.use('/api', apiRouter);

// ENDPOINTS //

//Create a new user
apiRouter.post('/auth/create', (req, res) => {
    const { email, password } = req.body;
  
    // check if the user already exists
    if (users[email]) {
      return res.status(409).send({ msg: 'User already exists' });
    }
  
    // create new user
    const user = { email, password, token: uuid.v4() };
    users[email] = user;
  
    res.send({ token: user.token });
  });

// Login an existing user
apiRouter.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
  
    const user = users[email];
    if (user && user.password === password) {
      user.token = uuid.v4(); // refresh token for this session
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
