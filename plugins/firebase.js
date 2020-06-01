//import firebase from 'firebase/app'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

if (!firebase.apps.length) {
    const config = {
        apiKey: "AIzaSyBgBsHIVwd2gMWjnCDUclnl8Ag5wpIBbO0",
        authDomain: "sign-me-out.firebaseapp.com",
        databaseURL: "https://sign-me-out.firebaseio.com",
        projectId: "sign-me-out",
        storageBucket: "sign-me-out.appspot.com",
        messagingSenderId: "352965672516",
        appId: "1:352965672516:web:045b6ec6f7f97d53"
    }
    //firebase.initializeApp(config)

    !firebase.apps.length ? firebase.initializeApp(config) : ''

    firebase.firestore().enablePersistence({synchronizeTabs:true})
        .then(() => {
            console.log("Woohoo! Multi-Tab Persistence!")
        })
        .catch(function(err) {
            if (err.code == 'failed-precondition') {
                // Multiple tabs open, persistence can only be enabled
                // in one tab at a a time.
                // ...
            } 
            else if (err.code == 'unimplemented') {
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
            }
    });
}
// const fireDb = firebase.firestore()
// const fireAuth = firebase.auth()
// export {fireDb,fireAuth}

export const fireAuth = firebase.auth()
export const fireDb = firebase.firestore()
export default firebase