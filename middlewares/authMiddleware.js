const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')

const isJwtValide = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.json('unauthorized')
        }
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
        if (verifiedToken) {
            req.app.locals.user = await User.findById(verifiedToken.userId);
        }
        else {
            res.json({message: 'unauthorized'})
        }
    }
    catch(err) {
        throw err
    }
}

module.exports = isJwtValide