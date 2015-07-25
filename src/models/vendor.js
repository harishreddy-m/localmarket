var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VendorSchema   = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
    name:{ type : String , unique : true, required : true, dropDups: true },
    email:String,
    phone:String,
    address:String,
    logo:String,
    categories:[String],
    pincodes:[String]
});

module.exports = mongoose.model('Vendor', VendorSchema);