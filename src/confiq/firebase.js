import firebase from "firebase"
// import { signIn } from "../../../../../React Advance Module/olx_project/src/config/firebase";
import swal from "sweetalert";
var firebaseConfig = {
  apiKey: "AIzaSyDocGaboGv7SI8WTujEMbvPHJtsgg-deVU",
  authDomain: "react-chat-app-b7b57.firebaseapp.com",
  projectId: "react-chat-app-b7b57",
  storageBucket: "react-chat-app-b7b57.appspot.com",
  messagingSenderId: "991857138954",
  appId: "1:991857138954:web:a63133b01322d54e522ef3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const db = firebase.firestore()
// const rt = firebase.database()
const storage = firebase.storage()

function signUp(email, password, fullName, contact) {
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log("user", user);

      
    
      db.collection("usersInfo").doc(user.uid).set({
        email,
        fullName,
        contact,
        uid: user.uid,

      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
        swal("", "Fill all the required field", "error")
      
      // console.log("Error",);
      // ..
    })

}





function signIn(email, password) {
  return auth.signInWithEmailAndPassword(email, password)
}

const storeProfilePic = async (file) => {
  console.log("file", file);
  const storageRef = storage.ref(`images/${file.name}`)
  await storageRef.put(file)
  const url = await storageRef.getDownloadURL()

  return url
}

const info = async (docId, imgUrl) => {
  console.log("docId*******", docId);
  return await db.collection("usersInfo").doc(docId).update({
    profileImg: imgUrl
  })

}
const addMessage = async (docId, inputMessage) => {

  return await db.collection("AllMessages").add({
    message: inputMessage,
    sender: docId,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })

}


const getData = () => {
  return db.collection("usersInfo")
}

const authState = () => {
  return auth
}

const getMessage = () => {

  return db.collection("AllMessages")

}

const getAllMsgs = () => {
  return new Promise((resolve, reject) => {
    db.collection("AllMessages").orderBy('timestamp', 'asc')
    .onSnapshot((snapshot) => {
      var arr = [];
      snapshot.forEach(doc => {
        arr.push({ ...doc.data() })
        resolve(arr)
      })
    });
  })
}



export {
  signUp,
  signIn,
  storeProfilePic,
  info,
  addMessage,
  getData,
  authState,
  getMessage
}