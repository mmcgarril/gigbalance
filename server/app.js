const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const routes = require('./routes')

const allowedOrigins = [
    'http://localhost:5173',
    'https://gigbalance.vercel.app'
];
  
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true
}));

app.use(async (req, res, next) => {
  try {
      await connectToDatabase();
      next(); 
  } catch (error) {
      console.log('Database connection error:', error);
      res.status(500).send('Database connection failed');
  }
});

//middleware
app.use(express.json())
app.use(cookieParser());

app.use('/api', routes)

//test backend
app.get('/api/test', (req, res) => {
    res.send('Backend is alive');
  });

module.exports = app;