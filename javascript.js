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
  	var data = null
  	const dataObject = firebase.database().ref().child('Players/amountofplayers');
  	dataObject.on('value', snap => {
    localStorage.setItem("amountofplayers", snap.val());
    })


  	//hier begint post



	var xdataObject = firebase.database().ref().child("Players");
	xdataObject.child(Number(localStorage.amountofplayers)+1).child("Score").set(localStorage.correctCounter)
	xdataObject.child(Number(localStorage.amountofplayers)+1).child("Name").set(localStorage.nameplayer)
	xdataObject.child(Number(localStorage.amountofplayers)+1).child("Difficulty").set(localStorage.difficulty)
	xdataObject.child('amountofplayers').set(Number(localStorage.amountofplayers)+1);
}
