
var express = require('express');
var router = express.Router();
var Vendor = require('../models/vendor');
var Item = require('../models/item');
var _ = require('underscore');
var Category = require('../models/category');
multiparty = require('connect-multiparty'),
multipartyMiddleware = multiparty(),



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
	console.log(req.body);
	Category.findOne({name:req.params.catname}).select("items").populate("items").exec(function(error,category){
		if(category)
			res.send(category.items);
		else
			res.send('noitems')
	});
});


router.post('/new',multipartyMiddleware,function(req,res){
	var item = new Item(req.body);
	item.image = req.files.file.path.replace('public',"").replace('\\','/');
	
	item.save(function(err){
		if(!err){
			Category.findOneAndUpdate({name:req.body.category}, {$push:{"items":item._id}}, {safe: true, upsert: true, new : true}, function(err, doc){
				if (err) return res.send(500, { error: err });
				return res.send("succesfully saved");
			});
		}
	});
});


module.exports = router;