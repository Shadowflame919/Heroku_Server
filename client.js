var socket = io();
var username = undefined;
var user_scores = undefined;

$('form').submit(function(){	// When user sumbits name
	socket.emit('submit username', $('#m').val());
	username = $('#m').val();
	$('#form-div').hide();
	$('#user-text').show();
	return false;
});

socket.on('user scores', function(scoreList){
	user_scores = scoreList;
	renderLeaderboard();
	if (username != undefined) renderText();
});

function renderText() {
	textString = "";
	textString += "Playing as " + username + "<br>";
	textString += "Points: " + user_scores[username];
	document.getElementById("text").innerHTML = textString;
}

function renderLeaderboard() {
	textString = "";
	keyList = Object.keys(user_scores);
	for (var i=0; i<keyList.length && i<10; i++) {
		textString += (i+1) + ". " + keyList[i] + ": " + user_scores[keyList[i]] + "<br>";
	}
	document.getElementById("leaderboard").innerHTML = textString;
}

function pressButton() {
	user_scores[username] += 1;
	renderText();
}

function saveScore() {
	socket.emit('save score', {name:username, score:user_scores[username]});
}