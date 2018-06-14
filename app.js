(function () {
    const config = {
    apiKey: "AIzaSyBSYQEzJnHMP4rexiPbMHVtRosqtEeHFL4",
    authDomain: "pim-project-b8698.firebaseapp.com",
    databaseURL: "https://pim-project-b8698.firebaseio.com",
    storageBucket: "pim-project-b8698.appspot.com",
  };
  firebase.initializeApp(config);
  var data = null
  const dataObject = firebase.database().ref().child(localStorage.difficulty + '/0/Q' + localStorage.counter + '/0');
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
    localStorage.setItem("info", data.info);
    localStorage.setItem("correctAnswer", data.correct);
    newCounter = Number(Number(localStorage.counter) + 1)
    localStorage.setItem("counter", newCounter);
  }
  })
}());