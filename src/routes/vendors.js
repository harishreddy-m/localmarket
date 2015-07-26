var express = require('express');
var router = express.Router();
var mongoose     = require('mongoose');
var _ = require('underscore');

var fs = require('fs');
var parse = require('csv-parse');
// middleware specific to this router
var Vendor = require('../models/vendor');

// define the home page route
router.get('/pincode/:pin', function(req, res) {
	Vendor.find({ pincodes: req.params.pin}).select(' -__v -logo').exec(function(error,vendors){
		res.send(vendors);
	});

});
// define the about route
router.get('/detail/:id', function(req, res) {
	res.send('About ');
});

router.post('/update',function(req,res){
	var upvendor = req.body.toupdate;
	var field = req.body.field;
	Vendor.findById(upvendor._id, function (err, vendor) {
  if (err) return handleError(err);
  if(field=='categories' || field=='pincodes')
  vendor[field] = upvendor[field].split(",");
  else
  vendor[field] = upvendor[field];
  vendor.save(function (err) {
    if (err) return handleError(err);
    res.send(200);
  });
}); 

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

router.post('/bulk',function(req,res){
	var csv = req.files.file.path;
	var parser = parse({delimiter: '|'});
	var input = fs.createReadStream(csv);

	var output = [];
// Create the parser

// Use the writable stream api
parser.on('readable', function(){
	while(record = parser.read()){
		var bulkone = {_id:mongoose.Types.ObjectId(),
			name:record[0],email:record[1],phone:record[2],address:record[3],categories:record[4].split(','),pincodes:record[5].split(',')}
		output.push(bulkone);
	}
});
// Catch any error
parser.on('error', function(err){
	console.log(err.message);
});
parser.on('finish', function(){
	Vendor.collection.insert(output);
	console.log('import of vendors finished');
});
input.pipe(parser);
res.send(200);
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