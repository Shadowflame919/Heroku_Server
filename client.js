var socket = io();

$('form').submit(function(){
	socket.emit('send message', $('#m').val());
	$('#m').val('');
	return false;
});

socket.on('distribute message', function(msg){
	$('#messages').append($('<li>').text(msg));
});