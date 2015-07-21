var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ItemSchema   = new Schema({
	name:String,
    price:Number,
    image:String,
});
module.exports = mongoose.model('Item', ItemSchema);