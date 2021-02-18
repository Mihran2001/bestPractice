const express = require('express');
const router = express.Router();
const userControlle = require('../controllers/userController')

router.post('/login', userControlle.login)
router.post('/register', userControlle.register)

module.exports = router;
