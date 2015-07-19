var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    username:{ type : String , unique : true, required : true, dropDups: true },
    password:'string',
    email:{ type : String , unique : true, required : true, dropDups: true },
    isCustomer:'boolean'
});

module.exports = mongoose.model('User', UserSchema);