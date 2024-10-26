import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js"
import { getFirestore,collection, addDoc,doc,getDoc ,getDocs,setDoc,query,orderBy, deleteDoc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC7RtocKn9RRMREVis0KoJeIISZMysXFaA",
    authDomain: "pls-work-c0d1a.firebaseapp.com",
    projectId: "pls-work-c0d1a",
    storageBucket: "pls-work-c0d1a.appspot.com",
    messagingSenderId: "576747885610",
    appId: "1:576747885610:web:1aa9af29c5ad8633299f53",
    measurementId: "G-9Z5K70GDEK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db)




export async function addData(message){   
    
    const docRef = doc(db, "queries", "count");
    let sdata = 0
    try {
        // Fetch the document
        const docSnap = await getDoc(docRef);
        sdata = docSnap.data(); 
        
    } catch (error) {
        console.error("Error getting document:", error);
    }

    try {   
        const docRef = await addDoc(collection(db, "queries"), {
            id: sdata.num + 1,
            input:message,
            output:""
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

    // Increment student number

    try {
        const docRef = doc(db, "queries", "count");
        // Set the document with the given data
        await setDoc(docRef, {num:sdata.num+1});
        console.log("Student data added/updated successfully!");
    } catch (error) {
        console.error("Error setting document: ", error);
    }
}