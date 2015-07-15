var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VendorSchema   = new Schema({
    name:String,
    email:String,
    phone:String,
    address:String,
    logo:String,
    categories:[String],
    pincodes:[String]
});

module.exports = mongoose.model('Vendor', VendorSchema);