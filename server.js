var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){	// If client asks for "/" then they want the html file
	res.sendFile(__dirname + '/client.html');
});
app.get('/client.js', function(req, res){	// If client asks for "/client.js" then they want the js file
	res.sendFile(__dirname + '/client.js');
});

io.on('connection', function(socket){	// When client connects to server
	console.log("user connected...");
	socket.emit('user scores', user_list);	// Give user score list after connecting
	
	socket.on('submit username', function(name){
		console.log(name + ' is now playing');
		if (user_list[name] == undefined) user_list[name] = 0;
		socket.emit('user scores', user_list);	// After logging in client should be given updated leaderboard with their own username inside
	});
	
	socket.on('disconnect', function(){
		console.log('user disconnected...');
	});
	
	socket.on('button pressed', function(){
		console.log("Button Pressed");
		number ++;
		io.emit('new number', number);
	});
	
	socket.on('save score', function(userStats){
		user_list[userStats.name] = userStats.score;
		socket.emit('user scores', user_list);
	});
});

var port = Number(process.env.PORT || 8080);

http.listen(port, '0.0.0.0', function(){
	console.log('listening on *:8080');
});

user_list = {};