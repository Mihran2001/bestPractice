const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const registerValidation = require('../middlewares/registerValidation')

router.post('/login', userController.login)
router.post('/register', registerValidation, userController.register)
router.get('/signOut', userController.signOut)

module.exports = router;