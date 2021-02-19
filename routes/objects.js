const express = require('express');
const router = express.Router();
const objectController = require('../controllers/objectController')

router.post('/createObject', objectController.creatObject)
router.delete('/deleteObj', objectController.deleteObject)
router.put('/editObject', objectController.editObject)

module.exports = router