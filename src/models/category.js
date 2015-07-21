var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CategorySchema   = new Schema({
	name:String,
    items:[{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}]
}, { collection: 'categories' });

module.exports = mongoose.model('Category', CategorySchema);