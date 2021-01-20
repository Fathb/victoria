const firebase = require ('firebase/app')
require('firebase/database')

const config = {
  apiKey: "AIzaSyBJ_Nd4xcE0Sqn1Qpa9rWRGkwLa0T04LUc",
  authDomain: "bracket-759ba.firebaseapp.com",
  databaseURL: "https://bracket-759ba.firebaseio.com",
  projectId: "bracket-759ba",
  storageBucket: "bracket-759ba.appspot.com",
  messagingSenderId: "768257974480",
  appId: "1:768257974480:web:49374f503fbf48bf1f3ed5",
  measurementId: "G-LMBHX11FYW"
};

// const config = {
//   apiKey: "AIzaSyBJAomMzAu2UlUBEGkYMhW2dnKNp-ta0Kg",
//   authDomain: "al-mubarok.firebaseapp.com",
//   databaseURL: "https://al-mubarok.firebaseio.com",
//   projectId: "al-mubarok",
//   storageBucket: "al-mubarok.appspot.com",
//   messagingSenderId: "733115326431",
//   appId: "1:733115326431:web:26ac45953aa4a6d5b12e6a",
//   measurementId: "G-TGBNYTWMN1"
// };
firebase.initializeApp(config);
module.exports = firebase