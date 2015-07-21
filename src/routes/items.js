
var express = require('express');
var router = express.Router();
var Vendor = require('../models/vendor');
var _ = require('underscore');
var Category = require('../models/category');




router.get("/categories",function(req,res){
	Vendor.find().select("categories").exec(function(error,vendors){
				var cats = [];
				_.each(vendors,function(vendor){
					cats=cats.concat(vendor.categories);
				});
				cats = _.uniq(cats);

				res.send(cats);
			});
});

router.get("/items/:catname",function(req,res){
	Category.findOne({name:req.params.catname}).select("items").populate("items").exec(function(error,category){
		       if(category)
				res.send(category.items);
			   else
			   	res.send('noitems')
			});
});

module.exports = router;