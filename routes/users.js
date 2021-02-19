const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/login', userController.login)
router.post('/register', userController.register)
//router.post('/profile', authMiddleware, userController.profile)
router.get('/signOut', userController.signOut)

module.exports = router;
