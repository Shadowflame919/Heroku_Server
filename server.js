var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/client.html');
});
app.get('/client.js', function(req, res){
	res.sendFile(__dirname + '/client.js');
});

io.on('connection', function(socket){
	console.log("user connected...")
	socket.on('disconnect', function(){
		console.log('user disconnected...');
	});
	
	socket.on('send message', function(msg){
		io.emit('distribute message', msg);
	});
	
	socket.on('move', function(dir){
		console.log("Moved in dir " + dir)
	});
});

var port = Number(process.env.PORT || 8080);

http.listen(port, '0.0.0.0', function(){
	console.log('listening on *:8080');
});
