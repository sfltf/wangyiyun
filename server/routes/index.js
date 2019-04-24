var express = require('express');
var router = express.Router();
let dbOperating = require('../api/api');

/* GET home page. */
router.post('/test', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  dbOperating.queryAll(req,res,next);
});

module.exports = router;
