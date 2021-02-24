const validator = require('validator')
const isEmpty = require('./isEmpty')
const emailValidator = require("email-validator");

const validateRegisterInput = (req, res, next) => {
    try {

        if (!emailValidator.validate(req.body.email))
        {
            res.json({message: 'This is not valid email'}) 
        }
        if (!validator.isLength(req.body.username, {
                min: 2,
                max: 30
            })) {
            res.json({message: 'Username should be between 2 and 30 characters'}) 
        }
        if (validator.isEmpty(req.body.username)) {
            res.json({message: 'Username is required'}) 
        }
        if (validator.isEmpty(req.body.password)) {
            res.json({message: 'Password is required'}) 
        }
        if (!validator.isLength(req.body.password, {
                min: 6,
                max: 30
            })) {
            res.json({message: 'Password should be at least 6 characters'}) 
        }
        next()
        
    }
    catch(err) {
        throw err
    }
}

module.exports = validateRegisterInput