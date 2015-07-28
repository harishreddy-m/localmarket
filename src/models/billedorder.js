var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BilledOrderSchema   = new Schema({
    order : {type: mongoose.Schema.Types.ObjectId, ref: 'Order'},
    billAmount : Number,
    timestamp: Date,
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'}
});

module.exports = mongoose.model('BilledOrder', BilledOrderSchema);