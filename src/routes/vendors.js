var express = require('express');
var router = express.Router();
var mongoose     = require('mongoose');

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
	new Vendor({_id:mongoose.Types.ObjectId(),name:req.body.name,email:req.body.email,logo:url,categories:cats,pincodes:pins,phone:req.body.phone,address:add}).save(function(err,vendor){
		if(!err){	
		res.send("success");
		}else{
			console.log(err);
			res.send(500);
		}
	});
});

router.post('/delete',function(req,res){
	var ids = req.body.todelete;
	for(i=0;i<ids.length;i++){
			console.log(ids[i]);
	Vendor.findById(ids[i],function(err,doc){
		console.log(doc);
	})		
	Vendor.findByIdAndRemove(ids[i],function(err,doc){
		console.log(err);
		res.send("success");
	})
	}
});

module.exports = router;