(function () {
    const config = {
    apiKey: "AIzaSyBSYQEzJnHMP4rexiPbMHVtRosqtEeHFL4",
    authDomain: "pim-project-b8698.firebaseapp.com",
    databaseURL: "https://pim-project-b8698.firebaseio.com",
    storageBucket: "pim-project-b8698.appspot.com",
  };
  firebase.initializeApp(config);
  var dataObject = firebase.database().ref().child("Players");
  dataObject.child("Lucas").set("Some Value")
}());