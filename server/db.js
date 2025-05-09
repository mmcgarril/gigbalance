const mongoose = require('mongoose');

let conn = null;

async function connectToDatabase() {
  if (conn) return conn; // If a connection exists, return it

  conn = await mongoose.connect(process.env.MONGO_URI, {
    bufferCommands: false,
  });

  console.log('MongoDB connected (Vercel)');
  return conn;
}

module.exports = connectToDatabase;
