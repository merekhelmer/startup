// service/database.js
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const dbConfig = require('./dbConfig.json');

const url = `mongodb+srv://${dbConfig.userName}:${dbConfig.password}@${dbConfig.hostname}`;
const dbName = 'startupDB';

const client = new MongoClient(url);
let db;
let userCollection;
let sessionsCollection;

(async function connectDB() {
  try {
    await client.connect();
    db = client.db(dbName);
    userCollection = db.collection('users');
    sessionsCollection = db.collection('sessions');
    console.log(`Connected to MongoDB database: ${dbName}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
})();

async function getUser(email) {
  return await userCollection.findOne({ email });
}

async function getUserByToken(token) {
  return await userCollection.findOne({ token });
}

async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { email, password: hashedPassword, token: uuid.v4() };
  await userCollection.insertOne(user);
  return user;
}

function generateSessionCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

async function createSession(session) {
  await sessionsCollection.insertOne(session);
}

async function getSession(sessionCode) {
  return await sessionsCollection.findOne({ sessionCode });
}

async function getActiveSessions() {
  return await sessionsCollection.find({ isActive: true }).toArray();
}

async function addPreferencesToSession(sessionCode, preferences) {
  await sessionsCollection.updateOne(
    { sessionCode },
    { $set: { preferences } }
  );
}

async function addVote(sessionCode, movieId) {
  await sessionsCollection.updateOne(
    { sessionCode },
    { $inc: { [`votes.${movieId}`]: 1 } }
  );
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  generateSessionCode,
  createSession,
  getSession,
  getActiveSessions,
  addPreferencesToSession,
  addVote,
};