var express = require('express');
var router = express.Router();
// middleware specific to this router
var Vendor = require('../models/vendor');

// define the home page route
router.get('/pincode/:pin', function(req, res) {
  Vendor.find({ pincodes: req.params.pin}, function(error,vendors){
  	res.send(vendors);
  });

});
// define the about route
router.get('/detail/:id', function(req, res) {
  res.send('About ');
});

router.post('/new',function(req,res){
	var cats = req.body.categories.split(",");
	var pins = req.body.pincodes.split(",");
	var url = req.files.file.path.replace('public',"").replace('\\','/');
	var add = req.body.address.replace("\n",",");
	Vendor.create({name:req.body.name,email:req.body.email,logo:url,categories:cats,pincodes:pins,phone:req.body.phone,address:add},function(err,vendor){
		if(!err)
		console.log(vendor);
	})
	res.send("success");
});

module.exports = router;