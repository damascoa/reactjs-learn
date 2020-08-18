import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


let firebaseConfig = {
    apiKey: "AIzaSyDhVykRmKrkR9NxbRzsJkVPHEGo5TbIXvg",
    authDomain: "reactblog-c6b06.firebaseapp.com",
    databaseURL: "https://reactblog-c6b06.firebaseio.com",
    projectId: "reactblog-c6b06",
    storageBucket: "reactblog-c6b06.appspot.com",
    messagingSenderId: "1056693889280",
    appId: "1:1056693889280:web:7e81da206f0090b535abe5",
    measurementId: "G-S66TY46FC3"
};



class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.app = app.database();
    }


    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email, password);
    }

    async register(nome, email, password) {
        await app.auth().createUserWithEmailAndPassword(email, password);
        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({ nome: nome });

    }

    isInitialized() {
        return new Promise(resolve =>{
            app.auth().onAuthStateChanged(resolve);
        });
    }
}

export default new Firebase();
