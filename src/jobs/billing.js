
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
                var billorder = new BilledOrder({billingdate : new Date(),customer:customers[i]._id,billamount:0});

                 var billamount=0;
                 for(var j=0;j<customers[i].orders.length;j++){                    
                    if(customers[i].orders[j].frequency=='daily'){
                        billorder.orders.push(customers[i].orders[j]._id);
                        billamount=billamount+(customers[i].orders[j].quantity*customers[i].orders[j].item.price);
                    }else if(customers[i].orders[j].frequency=='once'){

                    }else if(customers[i].orders[j].frequency=='monthly'){

                    }
                 }
                 billorder.billamount = billamount;
                 billorder.save(function(error){
                    if(error)
                    console.log(error);
                 });
            }
            })
        }
    });
done();
});

agenda.every('24 hours', 'generate bills for orders');

exports.agenda = agenda;