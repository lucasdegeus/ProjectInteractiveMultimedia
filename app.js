(function () {
    const config = {
    apiKey: "AIzaSyBSYQEzJnHMP4rexiPbMHVtRosqtEeHFL4",
    authDomain: "pim-project-b8698.firebaseapp.com",
    databaseURL: "https://pim-project-b8698.firebaseio.com",
    storageBucket: "pim-project-b8698.appspot.com",
  };
  firebase.initializeApp(config);
  var data = null
  const dataObject = firebase.database().ref().child(localStorage.difficulty + '/Q' + localStorage.counter);
  dataObject.on('value', snap => {
    data= snap.val();
    if (data == null) {
      window.location.href = 'final.html'
      
    }
    else {
    document.getElementById("question").innerHTML = data.Q;
    document.getElementById("answer1").innerHTML = data.A1;
    document.getElementById("answer2").innerHTML = data.A2;
    document.getElementById("answer3").innerHTML = data.A3
    document.getElementById("answer4").innerHTML = data.A4;
    var routeData = data.route;
    var route = routeData.split("BREAK");
    var i = 0;
    document.getElementById("routebeschrijving").innerHTML = data.painter;
    for (i in route) {
      document.getElementById("routebeschrijving").innerHTML += (route[i]) + "<br>";
    };
    localStorage.setItem("explaincorrect", data.explaincorrect);
    localStorage.setItem("correctAnswer", data.correct);
    localStorage.setItem("fact", data.fact);
    localStorage.setItem("painter", data.painter);
    localStorage.setItem("painting", data.painting);
    if (data.correct == "a") {
      localStorage.setItem("fullwrittenCorrectAnswer", data.A1)
    }
    if (data.correct == "b") {
      localStorage.setItem("fullwrittenCorrectAnswer", data.A2)
    }
    if (data.correct == "c") {
      localStorage.setItem("fullwrittenCorrectAnswer", data.A3)
    }
    if (data.correct == "d") {
      localStorage.setItem("fullwrittenCorrectAnswer", data.A4)
    }
  }
  })
}());