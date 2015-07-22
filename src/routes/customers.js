
var express = require('express');
var router = express.Router();
var Vendor = require('../models/vendor');
var _ = require('underscore');
var Customer = require('../models/customer');
var Category = require('../models/category');

var Order = require('../models/order');



router.post("/profile",function(req,res){
	Customer.findOneAndUpdate({whois:req.session.user._id}, {pincode:req.body.pincode}, function(err) {
		if(!err)
			res.send("success");
	});
});

router.post("/buy",function(req,res){
	var order = new Order(req.body);
	order.save(function(err){
		if(!err){
			Customer.findOneAndUpdate({whois:req.session.user._id}, {$push:{"orders":order}}, function(err) {
				if(!err)
					res.send("success");
				else{
					console.log(err);
					res.send(500);
				}
			});
		}
	});
});

router.get("/items",function(req,res){
	Customer.findOne({whois:req.session.user._id},function(error,customer){
		if(error)
			console.log(error);
		else{
			Vendor.find({ pincodes: customer.pincode}).select("categories").exec(function(error,vendors){
				var cats = [];
				_.each(vendors,function(vendor){
					cats=cats.concat(vendor.categories);
				});
				cats = _.uniq(cats);
				Category.find()
				.where('name')
				.in(cats)
				.populate("items")
				.exec(function (err, records) {
					res.send(records);
				});				
			});
		}
	});
});

module.exports = router;