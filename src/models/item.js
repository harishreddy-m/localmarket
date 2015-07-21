var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ItemSchema   = new Schema({
	name:String,
    price:Number,
});

module.exports = mongoose.model('Item', ItemSchema);