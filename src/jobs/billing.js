
var Agenda = require('agenda');
var config = require('config');
var dbConfig; 

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
    dbConfig = config.get('App.dbConfig.url');
}else{
    dbConfig = "mongodb://"+config.get('App.dbConfig.user')+":"+config.get('App.dbConfig.password')+"@"+process.env.OPENSHIFT_MONGODB_DB_HOST+":"+process.env.OPENSHIFT_MONGODB_DB_PORT+"/localmarket";
}
var agenda = new Agenda({db: { address: dbConfig,collection:'agendajobs'}});
var Customer = require('../models/customer');
var Item = require('../models/item');
var BilledOrder = require('../models/billedorder');
agenda.define('generate bills for orders', function(job, done) {
    console.log('Generating bill for ' + new Date());

    Customer.find({}).select("orders").populate("orders").exec(function(error,customers){
        if(error)
            console.log(error);
        else{
            Item.populate(customers,{path: 'orders.item' },function(){
                for(var i=0;i<customers.length;i++){
                    var today = new Date();
                    var dailyorders = new BilledOrder({billingdate : today,customer:customers[i]._id,billamount:0});
                    var onceorders = new BilledOrder({billingdate : today,customer:customers[i]._id,billamount:0});
                    var monthlyorders = new BilledOrder({billingdate : today,customer:customers[i]._id,billamount:0});
                    var dailyamount=0,onceamount=0,monthlyamount=0;
                   for(var j=0;j<customers[i].orders.length;j++){                    
                    if(customers[i].orders[j].frequency=='daily'){
                        dailyorders.orders.push(customers[i].orders[j]._id);
                        dailyamount=dailyamount+(customers[i].orders[j].quantity*customers[i].orders[j].item.price);
                    }else if(customers[i].orders[j].frequency=='once' && getSimpleDate(customers[i].orders[j].deliverydate)==getSimpleDate(today)){
                        onceamount  =onceamount+ customers[i].orders[j].quantity*customers[i].orders[j].item.price;
                        onceorders.orders.push(customers[i].orders[j]._id);
                    }else if(customers[i].orders[j].frequency=='monthly' && customers[i].orders[j].deliveryday==today.getDate()){
                         monthlyamount  =monthlyamount+ customers[i].orders[j].quantity*customers[i].orders[j].item.price;
                        monthlyorders.orders.push(customers[i].orders[j]._id);
                    }
                }
                 dailyorders.billamount=dailyamount;
                 onceorders.billamount=onceamount;
                 monthlyorders.billamount=monthlyamount;
                if(dailyamount>0)
                dailyorders.save(function(error){if(error)console.log(error);});
                if(onceamount>0)
                onceorders.save(function(error){if(error)console.log(error);});
                if(monthlyamount>0)
                monthlyorders.save(function(error){if(error)console.log(error);});
                 console.log('Generating bill completed at ' + new Date()+"\n-------------------------------\n");
            }
        })
}
});
   

done();
});

function getSimpleDate(dt){
    return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
}

agenda.every('2 minutes', 'generate bills for orders');

exports.agenda = agenda;