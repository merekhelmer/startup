// service/index.js
import express from 'express';
import { v4 as uuid } from 'uuid';

const app = require('express');
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

// In-memory data
let users = {};
let sessions = {};
let preferences = {};


// Serve static files
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
