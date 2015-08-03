var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PaymentSchema   = new Schema({
    paidDate:Date,
    paidamount:Number,
    source:String
});

module.exports = mongoose.model('Payment', PaymentSchema);