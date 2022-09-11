import {initializeApp} from "firebase/app";
import {addDoc, collection, getDocs, getFirestore, updateDoc, doc, deleteDoc} from 'firebase/firestore';
import {
    getAuth,
    GoogleAuthProvider,
    setPersistence,
    signInWithRedirect,
    browserSessionPersistence,
    inMemoryPersistence,
    signInWithEmailAndPassword
} from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKED,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const addItemInCollection = async (name: string, email: string | null | undefined, pathName: string) => {
    try {
        await addDoc(collection(db, pathName), {
            name: name,
            email: email,
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
export const getItemInCollection = async (pathName: string) => {
    try {
        const querySnapshot = await getDocs(collection(db, pathName));
        // querySnapshot.forEach((doc) => {
        //     //console.log(`${doc.id} => ${doc.data()}`);
        // });
        return querySnapshot.docs.map(doc => ({...doc.data(),
            id: doc.id
        }))
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
export const updateItemInCollection = async (id: string, name: string, pathName: string) => {
    try {
        const userDoc = doc(db, pathName, id)
        await updateDoc(userDoc, {name})
    } catch (e) {
        console.log(e)
    }
}
export const deleteItemInCollection = async (id: string, name: string, pathName: string) => {
    try {
        const userDoc = doc(db, pathName, id)
        await deleteDoc(userDoc)
    } catch (e) {
        console.log(e)
    }
}