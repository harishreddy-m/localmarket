var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OrderSchema   = new Schema({
    frequency:{ type : String,required : true },
    item:{type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
    quantity:Number,
    orderdate: Date,
    deliverydate: Date,
    deliveryday:Number
});

module.exports = mongoose.model('Order', OrderSchema);