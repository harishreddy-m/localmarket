
var express = require('express');
var router = express.Router();
var _ = require('underscore');
var Customer = require('../models/customer');
var Item = require('../models/item');


router.get("/customer/:customerId/orders",function(req,res){
	Customer.findById(req.params.customerId).select("orders").populate("orders").exec(function(error,customer){
		if(error)
			console.log(error);
		else{
			Item.populate(customer, { path: 'orders.item' },function(){
				res.send(customer.orders);
			});
		}
	});
});

router.get("/customers",function(req,res){
	Customer.find({}).populate("whois").exec(function(error,customer){
		if(error)
			console.log(error);
		else{
			res.send(customer);
		}
	})

})

module.exports = router;