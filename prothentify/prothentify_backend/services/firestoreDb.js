const firebase = require("firebase-admin");
const serviceAccount = require("../keys/firebase-keys.json");

const firebaseConfig = {
  credential: firebase.credential.cert(serviceAccount),
  databaseURL:
    "https://ibm-prothentify.firebaseio.com",
};

const ref = firebase.initializeApp(firebaseConfig).firestore();

module.exports = ref;
