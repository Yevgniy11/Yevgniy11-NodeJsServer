var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/gg', function(req, res, next) {
  res.send('<h1>Node Js Server Runing</h1>');
});
module.exports = router;
