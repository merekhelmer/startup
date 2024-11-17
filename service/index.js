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
  
    res.send({ sessionCode });
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
apiRouter.get('/recommendations/:sessionCode', async (req, res) => {
  const sessionCode = req.params.sessionCode;
  
  // find session
  const session = sessions[sessionCode];
  if (!session) {
    return res.status(404).send({ msg: 'Session not found' });
  }

  // extract preferences
  const { preferences } = session;
  if (!preferences || preferences.length === 0) {
    return res.status(400).send({ msg: 'No preferences found for this session' });
  }

  // combine mood and genres 
  const combinedGenres = new Set();
  preferences.forEach((pref) => {
    pref.genres.forEach((genre) => combinedGenres.add(genre));
  });
  const genreIds = [...combinedGenres].join(',');

  // TMDB API URL (edit for real query params later)
  const tmdbApiUrl = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreIds}&with_keywords=${moodKeywords}&sort_by=popularity.desc`;

  try {
    const response = await fetch(tmdbApiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`, // replace with actual API key
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching recommendations');
    }

    const data = await response.json();
    res.send(data.results);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).send({ msg: 'Failed to fetch recommendations' });
  }
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
