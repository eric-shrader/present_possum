// constructor for partcipants
var Participant = function(name) {
	this.name = name;
}
Participant.prototype.beenChosen = false;

var givers = new Array();

// function is used to create an array of partipants who havent been chosen yet
function createStillLeft(givers) {
	var stillLeft = new Array();
	for (var i = 0; i < givers.length; i++) {
		var receiver = givers[i];
		if (receiver.beenChosen === false) {
			stillLeft.push(receiver);
		}
	}
	return stillLeft;
}

// function is used to assign a receiver for each giver
function assignReceivers(givers) {
	var receivers = new Array();
	for (var i = 0; i < givers.length; i++) {
		var giver = givers[i];
		var stillLeft = createStillLeft(givers);
		do {
			var index = Math.floor(Math.random()*stillLeft.length);
			var receiver = stillLeft[index]
		} while (receiver === giver);
		receiver.beenChosen = true;
		receivers.push(receiver);
	}
	return receivers;
}

// adds the receivers to the table
function assignTableAsReceivers(receivers) {
	for (i = 0; i < receivers.length; i++) {
		var receiver = receivers[i];
		var tr = document.getElementById(i);
		tr.innerHTML = "<td>" + givers[i].name + "</td>" + "<td>" + receiver.name + "</td>";
	}
}

function init() {
	//assignTableAsGiver();
	var randomButton = document.getElementById("randomButton");
	randomButton.onclick = randomize;
	
	// function to randomize everything and let us reshuffle
		function randomize() {
		var receivers = assignReceivers(givers);
		assignTableAsReceivers(receivers);
		randomButton.innerHTML = "reshuffle";
		for (var i = 0; i < givers.length; i++) {
		givers[i].beenChosen = false;
		}
	}

	// function to add participants to the list
	function addParticipant() {
		var text = document.getElementById("addParticipant");
		var newParticipant = new Participant(text.value);
		givers.push(newParticipant);
		var table = document.getElementById("presents");
		var tr = document.createElement("tr");
		tr.setAttribute("id", givers.indexOf(newParticipant));
		table.appendChild(tr);
		var td = document.createElement("td");
		tr.appendChild(td);
		tr.innerHTML = newParticipant.name;
		text.value = "";
	}

	var addButton = document.getElementById("addButton");
	addButton.onclick = addParticipant;
	var text = document.getElementById("addParticipant");
	text.onkeydown = function(event) {
		if (event.key == "Enter") {
			addParticipant();
		}
	}

}

window.onload = init;