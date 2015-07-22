var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ItemSchema   = new Schema({
	name:{ type : String , unique : true, required : true, dropDups: true },
    price:Number,
    image:String,
});
module.exports = mongoose.model('Item', ItemSchema);