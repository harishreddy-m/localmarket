
var express = require('express');
var app = express();

app.get('/hello/:name', function(req, res){
  res.send('hello ' + req.params.name);
});

app.get('/', function(req, res){
  res.send('Now time is  ' + new Date());
});

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3030;
app.listen(port,ip,function(){
	console.log('Listening on  ' + ip + ":"+port);
});
