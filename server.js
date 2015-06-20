
var express = require('express');
var app = express();

app.get('/hello/:name', function(req, res){
  res.send('hello ' + req.params.name);
});

app.listen(process.env.OPENSHIFT_INTERNAL_PORT);
console.log('Listening on port ' + process.env.OPENSHIFT_INTERNAL_PORT);