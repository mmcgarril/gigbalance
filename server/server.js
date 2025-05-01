const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const routes = require('./routes')

/* const allowedOrigins = [
    'http://localhost:5173',
    'https://gigbalance.vercel.app'
  ]; */
  
app.use(cors({
    origin: true,
    credentials: true
}));

//middleware
app.use(express.json())
app.use(cookieParser());

app.use('/api', routes)

//database connection
mongoose.connect(process.env.MONGO_URI)
    .then(console.log('Database connected successfully'))
    .catch((err) => {
        console.log('Error connected to database', err)
    })

//test backend
app.get('/api/test', (req, res) => {
    res.send('Backend is alive');
  });
  

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})