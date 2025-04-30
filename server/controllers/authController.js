const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const register = async (req, res) => {
    try {
        //search db, if user exists send error message
        const foundEmail = await User.findOne({email: req.body.email})
        if (foundEmail) {
            return res.status(400).json({message: 'Email already exists'})
        }
    
        //if user doesn't exist, use bcrypt to hash pw and save to db
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
        })

        const savedUser = await user.save()
        //if user saved to db, create JWT and send in cookie
        if(savedUser) {
           const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
                { expiresIn: '7d' })
                console.log('NODE_ENV:', process.env.NODE_ENV); // should log 'production'

            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'None',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })

            res.json('Registration successful')
        } else {
            res.status(409).json({message: 'Registration error'})
        }

    } catch (err) {
        console.log('Server error', err)
    }
}

const login = async (req, res) => {
    try {
        //find user by email
        const foundUser = await User.findOne({email: req.body.email})

        if (!foundUser) {
            return res.status(401).json({message: 'Email not found'})
        }

        //compare user input password to hashed password in database
        const match = await bcrypt.compare(req.body.password, foundUser.password)

        if (match) {  //sign JWT and send in cookie
            const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET,
                { expiresIn: '7d'})
            
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'None',
                maxAge: 7* 24 * 60 * 60 * 1000 // 1 hour
            })
            res.status(201).json({message: 'Login successful'})
        } else {
            res.status(401).json({message: 'Invalid credentials'})
        }
    } catch (err) {
        console.log('Error with login', err)
    }
}

const logout = async (req, res) => {
    try {
        //remove jwt by responding with empty cookie, expires immediately
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        })
        res.status(201).json({message: 'User logged out successfully'})
    } catch (err) {
        res.json({message: 'Log out unsuccessful'})
    }
}

module.exports = { register, login, logout }