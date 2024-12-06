// database.js
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const dbConfig = require('./dbConfig.json');

const url = `mongodb+srv://${dbConfig.userName}:${dbConfig.password}@${dbConfig.hostname}`;

const client = new MongoClient(url);
const dbName = 'startupDB';
const usersCollectionName = 'users';
const sessionsCollectionName = 'sessions';

let db;
let userCollection;      
let sessionsCollection;   

// initialize MongoDB connection
(async function connectDB() {
  try {
    await client.connect();
    db = client.db(dbName);

    userCollection = db.collection(usersCollectionName);
    sessionsCollection = db.collection(sessionsCollectionName);

    console.log(`Connected to MongoDB database: ${dbName}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
})();

// User functions
async function getUser(email) {
  try {
    return await userCollection.findOne({ email: email });
  } catch (error) {
    console.error('Database getUser Error:', error);
    throw error;
  }
}

async function getUserByToken(token) {
  try {
    return await userCollection.findOne({ token });
  } catch (error) {
    console.error('Database getUserByToken Error:', error);
    throw error;
  }
}


async function updateUserToken(email, token) {
  try {
    return await userCollection.updateOne({ email: email }, { $set: { token: token } });
  } catch (error) {
    console.error('Database updateUserToken Error:', error);
    throw error;
  }
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);
  return user;
}

// Session functions
async function createSession(creatorEmail) {
  const sessionCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  const session = { sessionCode, creator: creatorEmail, preferences: [], votes: {} };

  await db.collection(sessionsCollectionName).insertOne(session);
  return session;
}

async function getSession(sessionCode) {
  return db.collection(sessionsCollectionName).findOne({ sessionCode });
}

async function addPreferencesToSession(sessionCode, preferences) {
  await db.collection(sessionsCollectionName).updateOne(
    { sessionCode },
    { $push: { preferences } }
  );
}

async function addVote(sessionCode, movieId) {
  await db.collection(sessionsCollectionName).updateOne(
    { sessionCode },
    { $inc: { [`votes.${movieId}`]: 1 } }
  );
}

module.exports = {
  getUser,
  getUserByToken,
  updateUserToken,
  createUser,
  createSession,
  getSession,
  addPreferencesToSession,
  addVote,
};
