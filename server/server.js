const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const routes = require('./routes')

//middleware
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/api', routes)

//database connection
mongoose.connect(process.env.MONGO_URI)
    .then(console.log('Database connected successfully'))
    .catch((err) => {
        console.log('Error connected to database', err)
    })

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})