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
	progressLoad();
	}

function progressLoad() {
	var totalQuestions = 10;
	var currentQuestion = localStorage.counter
	var progressPercentage = currentQuestion / totalQuestions * 100;
	document.getElementById("passed-questions").style.width = progressPercentage + "%";
	document.getElementById("currentQuestion").innerHTML = currentQuestion;
	document.getElementById("totalQuestions").innerHTML = totalQuestions;
	document.getElementById("totalQuestions").style.paddingLeft = progressPercentage + "%";
}

function changeCircleBackgrounds(x) {
    elements = document.getElementsByClassName(x);
    for (var i = 0; i < elements.length; i++) {
		elements[i].style.backgroundColor="#FFF";
		elements[i].style.color="#343A55";
		elements[i].style.border = "none";
    }
}
function removeBorders(x) {
    elements = document.getElementsByClassName(x);
    for (var i = 0; i < elements.length; i++) {
		elements[i].style.border = "none";
    }
}

function setAnswer(answer) {
	changeCircleBackgrounds('mc-circle');
	removeBorders('answerWrapper');
	document.getElementById('a').style.color = "#343A55";
	document.getElementById(answer).style.backgroundColor = "#343A55";
	document.getElementById(answer).style.border = "2px solid rgba(255, 255, 255, 0.2)";
	document.getElementById(answer).style.color = "#fff";
	localStorage.setItem("currentAnswer", answer);
	
	var selecteditem = 'answer-'+answer;
	console.log(selecteditem);
	document.getElementById(selecteditem).style.border = "2px solid rgba(255, 255, 255, 0.2)";
}


function nextquestion() {
  	var data = null
  	const dataObject = firebase.database().ref().child(localStorage.difficulty + '/0/Q' + localStorage.counter + '/0');
  	dataObject.on('value', snap => {
    data= snap.val();
    if (data == null) {
      window.location.href = 'final.html'
	}
	else {
		window.location.href = 'template-nederlands.html'
	}})

}

function answerCheck() {
	var data = null
	const dataObject = firebase.database().ref().child(localStorage.difficulty + '/0/Q' + localStorage.counter + '/0');
	dataObject.on('value', snap => {
  	data= snap.val();
  	if (data == null) {
		document.getElementById("nextquestion").innerHTML = "Einde";
	  }
	else {
		document.getElementById("nextquestion").innerHTML = "Volgende vraag"
	}
	})
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

function new_counter() {
	newCounter = Number(Number(localStorage.counter) + 1)
    localStorage.setItem("counter", newCounter);
    window.location.href  ="info.html"
}

function showRoutebeschrijving() {
	var x = document.getElementById("routeWrapper");
	if (x.style.display ==="none") {
		x.style.display = "block";
	}
		else {
			x.style.display = "none";
		}
}

function hideRoutebeschrijving() {
	var closeRoute = document.getElementById("routeWrapper");
	if (closeRoute.style.display ==="block") {
		closeRoute.style.display = "none";
	}
}

function submitQuestion() {
	//document.getElementById("vraag").value
	var ydataObject = null
	var submitDifficulty = document.getElementById("difficulty").value;
	const newydataObject = firebase.database().ref().child(submitDifficulty);
	newydataObject.on('value', snap => {
		amountofquestions = snap.val();
		countQuestion = 0
		for (i in amountofquestions) {
			countQuestion += 1;
		}
		localStorage.setItem('amountofquestions', countQuestion)
	})



  var xdataObject = firebase.database().ref().child(submitDifficulty);
  var newChild = Number(Number(localStorage.amountofquestions) + 1)
  xdataObject.child("Q" + newChild).child("Q").set(document.getElementById("vraag").value)
  xdataObject.child("Q" + newChild).child("A1").set(document.getElementById("ans1").value)
  xdataObject.child("Q" + newChild).child("A2").set(document.getElementById("ans2").value)
  xdataObject.child("Q" + newChild).child("A3").set(document.getElementById("ans3").value)
  xdataObject.child("Q" + newChild).child("A4").set(document.getElementById("ans4").value)
  xdataObject.child("Q" + newChild).child("correct").set(document.getElementById("correct").value)
  xdataObject.child("Q" + newChild).child("info").set(document.getElementById("info").value)
  xdataObject.child("Q" + newChild).child("route").set(document.getElementById("route").value)
}