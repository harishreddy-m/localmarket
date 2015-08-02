var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BilledOrderSchema   = new Schema({
    orders : [],
    billamount : Number,
    billingdate: Date,
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'}
});

module.exports = mongoose.model('BilledOrder', BilledOrderSchema);