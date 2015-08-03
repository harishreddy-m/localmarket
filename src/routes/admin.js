
var express = require('express');
var router = express.Router();
var _ = require('underscore');
var Customer = require('../models/customer');
var Item = require('../models/item');
var BilledOrder = require('../models/billedorder')

router.get("/customer/:customerId/orders",function(req,res){
	BilledOrder.find({customer:req.params.customerId,billingdate:getSimpleDate(new Date())}).select("orders").exec(function(error,bills){
		if(error)
			console.log(error);
		else{
			var responseOrders= [];
			for(i=0;i<bills.length;i++){
				responseOrders=_.union(responseOrders,bills[i].orders);
			}
			res.send(responseOrders);	
		}
	});
});

router.post("/edit/order",function(req,res){
	BilledOrder.findOne({customer:req.body.customer,billingdate:getSimpleDate(new Date())}).exec(function(error,bill){
		if(error)
			console.log(error);
		else{
			for(var i=0;i<bill.orders.length;i++){
				if(bill.orders[i].item === req.body.name){
				   bill.billamount = bill.billamount + (req.body.quantity - bill.orders[i].quantity)*bill.orders[i].price;
				   bill.orders[i].quantity = req.body.quantity;
				   bill.markModified('orders.'+i+'.quantity');
				   break;
				}
			}	
			bill.save(function(err){
				if(err) console.log(err);
				res.send(200);
			})
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


function getSimpleDate(dt){
    return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
}
module.exports = router;