const express = require('express');
const router = express.Router();
const objectController = require('../controllers/objectController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/createObject', authMiddleware, objectController.createObject)
router.delete('/deleteObject', authMiddleware, objectController.deleteObject)
router.put('/editObject', authMiddleware, objectController.editObject)
router.get('/getObjects', authMiddleware, objectController.getObjects)

module.exports = router