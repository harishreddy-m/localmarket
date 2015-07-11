var express = require('express');
var router = express.Router();

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('List all vendors');
});
// define the about route
router.get('/:id', function(req, res) {
  res.send('About ');
});

router.post('/new',function(req,res){

});

module.exports = router;