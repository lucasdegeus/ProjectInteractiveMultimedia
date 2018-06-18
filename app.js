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
    for (i in route) {
      document.getElementById("routebeschrijving").innerHTML += (route[i]) + "<br>";
    };
    localStorage.setItem("info", data.info);
    localStorage.setItem("correctAnswer", data.correct);
  }
  })
}());