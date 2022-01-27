const express = require('express');
const router = express.Router();
const filesRouter = require('./files')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/files', filesRouter);

module.exports = router;
