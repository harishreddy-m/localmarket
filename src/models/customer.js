var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CustomerSchema   = new Schema({
    pincode:{ type : String,required : true },
    whois:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    orders:[{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}]
});

module.exports = mongoose.model('Customer', CustomerSchema);