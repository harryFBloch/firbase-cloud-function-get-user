const functions = require('firebase-functions');
const admin = require('firebase-admin')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cloud-function-test-8d77f.firebaseio.com"
});

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

//make a request with userID and return that User
exports.returnUser = functions.https.onRequest((request, response) => {
 const id = request.body.id
 const ref = admin.database().ref('users/' + id)
  ref.on('value', snapshot => {
    //no need to continue listening for value changes
    ref.off()
    response.send(snapshot.val())
  })
});
