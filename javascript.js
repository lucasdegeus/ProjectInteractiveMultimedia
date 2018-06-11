var name = ""
var difficulty = ""
function startGame() {
	if (document.getElementById('difficulty').value != "Moeilijkheidsgraad") {
		difficulty_game(document.getElementById('nameplayer').value, document.getElementById('difficulty').value)
	}
	else {
		alert('Kies een Moeilijkheidsgraad')
	}
}

function difficulty_game(name,difficulty) {
	window.location.href = 'template-nederlands.html?' + name + "," + difficulty;
}

function receiveData() {
	
	//Haalt de meegegeven data in URL op vanaf ?
	var datastring = parent.document.URL.substring(parent.document.URL.indexOf('?'), parent.document.URL.length);
	//Haal het vraagteken weg van de string
	var datastring = datastring.substring(1);
	//Splits de data op in alles voor de , = naam. Alles erna = difficulty
	var dataarray = datastring.split(",");
	var name = dataarray[0];
	//Vervangt overal waar %20 staat voor een spatiebalk, anders krijg je tussen de voornaam en achternaam van mensen %20
	var name = name.replace(/%20/g," ")
	var difficulty = dataarray[1];
	document.getElementById("container").innerHTML = "Welkom " + name + '! Je hebt gekozen voor level: ' + difficulty;
	if (difficulty == "easy") {
		loadquestioneasy();
	}
	if (difficulty == "medium") {
		loadquestionmedium();
	}
	if (difficulty == "hard") {
		loadquestionhard();
	}
}
	
function loadquestioneasy() {
	document.getElementById("question").innerHTML = "Hier komt een makkelijke vraag door javacsript";
	document.getElementById("answer1").innerHTML = "Hier wordt antwoord 1 ingeladen door javascript makelijk"
	document.getElementById("answer2").innerHTML = "Hier wordt antwoord 2 ingeladen door javascript makelijk"
	document.getElementById("answer3").innerHTML = "Hier wordt antwoord 3 ingeladen door javascript makelijk"
	document.getElementById("answer4").innerHTML = "Hier wordt antwoord 4 ingeladen door javascript makelijk"
}

function loadquestionmedium() {
	document.getElementById("question").innerHTML = "Hier komt een medium vraag door javacsript";
	document.getElementById("answer1").innerHTML = "Hier wordt antwoord 1 ingeladen door javascript medium"
	document.getElementById("answer2").innerHTML = "Hier wordt antwoord 2 ingeladen door javascript medium"
	document.getElementById("answer3").innerHTML = "Hier wordt antwoord 3 ingeladen door javascript medium"
	document.getElementById("answer4").innerHTML = "Hier wordt antwoord 4 ingeladen door javascript medium"
}

function loadquestionhard() {
	document.getElementById("question").innerHTML = "Hier komt een moeilijk vraag door javacsript";
	document.getElementById("answer1").innerHTML = "Hier wordt antwoord 1 ingeladen door javascript moeilijk"
	document.getElementById("answer2").innerHTML = "Hier wordt antwoord 2 ingeladen door javascript moeilijk"
	document.getElementById("answer3").innerHTML = "Hier wordt antwoord 3 ingeladen door javascript moeilijk"
	document.getElementById("answer4").innerHTML = "Hier wordt antwoord 4 ingeladen door javascript moeilijk"
}

function test() {
	if (document.getElementById("question-1-answers-A").checked) {
		rate_value = document.getElementById('question-1-answers-A').value;
		alert(rate_value)
	}
	else if (document.getElementById("question-1-answers-B").checked) {
		rate_value = document.getElementById('question-1-answers-B').value;
		alert(rate_value)
	}
	else if (document.getElementById("question-1-answers-C").checked) {
		rate_value = document.getElementById('question-1-answers-C').value;
		alert(rate_value)
	}
	else if (document.getElementById("question-1-answers-D").checked) {
		rate_value = document.getElementById('question-1-answers-D').value;
		alert(rate_value)
	}
	else {
		alert('Kies een antwoord')
	}
}

function changeImg(varx) {
	document.getElementById('a').src = 'IMG/abcd/a.png';
	document.getElementById('b').src = 'IMG/abcd/b.png';
	document.getElementById('c').src = 'IMG/abcd/c.png';
	document.getElementById('d').src = 'IMG/abcd/d.png';
	document.getElementById(varx).src = 'IMG/abcd/'+varx+'-b.png';
	localStorage.setItem("currentActive", varx);
}

function nextquestion() {
	var hoi = localStorage.currentActive
	alert(hoi)
}