const app = require('../app');
const serverless = require('serverless-http');
const mongoose= require('mongoose')
require('dotenv').config();

let conn = null;

async function connectToDatabase() {
  if (conn) return conn;
  conn = await mongoose.connect(process.env.MONGO_URI, {
    bufferCommands: false,
  });
  console.log('MongoDB connected (Vercel)');
  return conn;
}

module.exports = async (req, res) => {
  await connectToDatabase();
  return serverless(app)(req, res);
};