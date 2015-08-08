var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CustomerSchema   = new Schema({
    pincode:{ type : String,required : true },
    whois:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    orders:[{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
    dueamount:{type:Number,default:0},
    payments:[{type: mongoose.Schema.Types.ObjectId, ref: 'Payment'}]
});

module.exports = mongoose.model('Customer', CustomerSchema);