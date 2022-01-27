const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

router.get('/data', fileController.get);
router.get('/list', fileController.list);

module.exports = router;
