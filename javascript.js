var name = ""
var difficulty = ""


function startGame() {
	if (document.getElementById('difficulty').value != "Moeilijkheidsgraad") {
		localStorage.setItem("difficulty", document.getElementById("difficulty").value)
		localStorage.setItem("nameplayer", document.getElementById("nameplayer").value)
		difficulty_game(document.getElementById('nameplayer').value, document.getElementById('difficulty').value)
	}
	else {
		alert('Kies een Moeilijkheidsgraad')
	}
	localStorage.setItem("counter", Number(1))
	localStorage.setItem("correctCounter", Number(0))
}

function difficulty_game(name,difficulty) {
	window.location.href = 'template-nederlands.html?' + name + "," + difficulty;
}

function receiveData() {
	document.getElementById("container").innerHTML = "Welkom " + localStorage.nameplayer + '! Je hebt gekozen voor level: ' + localStorage.difficulty;
	}

function changeAllBackgrounds(x) {
    elements = document.getElementsByClassName(x);
    for (var i = 0; i < elements.length; i++) {
		elements[i].style.backgroundColor="#FFF";
		elements[i].style.color="#343A55";
    }
}

function setAnswer(answer) {
	changeAllBackgrounds('mc-circle');
	document.getElementById('a').style.color = "#343A55";
	document.getElementById(answer).style.backgroundColor = "#343A55";
	document.getElementById(answer).style.color = "#fff";
	localStorage.setItem("currentAnswer", answer);
}


function nextquestion() {
	window.location.href = 'template-nederlands.html'

}

function answerCheck() {
	if (localStorage.currentAnswer == localStorage.correctAnswer) {
		document.getElementById("result").innerHTML = "Je had het goed!"
		newCorrectCounter = Number(Number(localStorage.correctCounter) +1);
		localStorage.setItem("correctCounter", newCorrectCounter);
	}
	else {
		document.getElementById("result").innerHTML = "Helaas je had het fout, het goede antwoord was: " + localStorage.correctAnswer
	}
	document.getElementById("infoblock").innerHTML = localStorage.info
}

function saveScore() {
	var ydataObject = null
	const newydataObject = firebase.database().ref().child('Players');
	newydataObject.on('value', snap => {
		amountofplayers = snap.val();
		countPlayers = 0
		for (i in amountofplayers) {
			countPlayers += 1;
		}
		localStorage.setItem('amountofplayers', countPlayers)
	})



  var xdataObject = firebase.database().ref().child("Players");
  xdataObject.child(Number(localStorage.amountofplayers)+1).child("Score").set(localStorage.correctCounter)
  xdataObject.child(Number(localStorage.amountofplayers)+1).child("Name").set(localStorage.nameplayer)
  xdataObject.child(Number(localStorage.amountofplayers)+1).child("Difficulty").set(localStorage.difficulty)
}	
		
function scorebord(data) {
	var head = document.createElement("THEAD");
	head.setAttribute("id", "TableHead");
	document.getElementById("myTable").appendChild(head);
	
    var y = document.createElement("TR");
    y.setAttribute("id", "myTr");
    document.getElementById("TableHead").appendChild(y);
	
	var body = document.createElement("TBODY");
	body.setAttribute("id", "TableBody");
	document.getElementById("myTable").appendChild(body);
	
	var foot = document.createElement("TFOOT");
	foot.setAttribute("id", "TableFoot");
	document.getElementById("myTable").appendChild(foot);

	var table = document.getElementById("myTable")
	var header = table.createTHead();
	var row = header.insertRow(0);
	var trName = row.insertCell(0);
	var trScore = row.insertCell(1);
	trName.innerHTML = "Naam"
	trScore.innerHTML = "Score"


	/*hier begint data uit API toevoegen*/
	var scoreData = null
	const newData = firebase.database().ref().child('Players');
	newData.on('value', snap => {
		scoreData = snap.val();
		document.getElementById("BovenTable").innerHTML = localStorage.difficulty
		for (i in scoreData) {
			if (scoreData[i].Difficulty == localStorage.difficulty) {
			var table = document.getElementById("TableBody");
			var row = table.insertRow(-1);
			var firstCell = row.insertCell(0)
			var secondCell = row.insertCell(1);
			firstCell.innerHTML = scoreData[i].Name;
			secondCell.innerHTML = scoreData[i].Score
		}
		}
	})
}		

