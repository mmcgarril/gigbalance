const jwt = require('jsonwebtoken')

const authorize = (req, res, next) => {
    const token = req.cookies?.jwt

    if (!token) {
        return res.status(401).json({message: 'No token, authorization denied'})
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = { id: decoded.id }
            next()
        } catch (err) {
            return res.status(401).json({message: 'Invalid token'})
        }
    }
}

module.exports = authorize