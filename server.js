
var express = require('express');
var app = express();

app.get('/hello/:name', function(req, res){
  res.send('hello ' + req.params.name);
});

var ip = process.env.OPENSHIFT_NODEJS_PORT || 3030
app.listen(ip);
console.log('Listening on port ' + ip);