import {db} from "./lib/firebaseConfig.js"
//"https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"
import {collection, addDoc,doc,getDoc ,getDocs,setDoc,query,orderBy, deleteDoc} from "firebase/firestore";

export async function resetData(){
    const coll = collection(db, "queries")
    // remove everything
    const getData = await getDocs(coll)
    getData.forEach(async (doc) => {deleteDoc(doc.ref)})

    // reset count to 0
    const count = doc(coll, "count")
    setDoc(count, {num: 0})
}

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

    // Increment query number

    try {
        const docRef = doc(db, "queries", "count");
        // Set the document with the given data
        await setDoc(docRef, {num:sdata.num+1});
        console.log("Student data added/updated successfully!");
    } catch (error) {
        console.error("Error setting document: ", error);
    }
}

export async function getData(){
    const coll = collection(db, "queries")
    const getData = await getDocs(coll)
    let ans = [];
    getData.forEach((doc) => {ans.push(doc.data())})
    console.log(ans)
    return ans
}

//resetData()