const express = require('express');
const router = express.Router();
const objectController = require('../controllers/objectController')
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.post('/createObject', authMiddleware, objectController.createObject)
router.delete('/deleteObject', authMiddleware, objectController.deleteObject)
router.put('/editObject', authMiddleware, objectController.editObject)
router.get('/getObjects', authMiddleware, objectController.getObjects)
router.post('/getFile', authMiddleware, upload.single('uploadedFile'), objectController.getFile)

module.exports = router