var express = require('express');
var router = express.Router();
let dbOperating = require('../api/api');

/* GET home page. */
router.post('/test', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  dbOperating.selectRecommendImg(req,res,next);
});

router.get('/getMenu',function(req,res,next) {
	console.log(req);
	dbOperating.selectMenu(req,res,next);
})

module.exports = router;
