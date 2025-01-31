
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA8rRVRRSLYy4uhFUYghjKf6O_OsQyLals",
  authDomain: "netflix-clone-a8c26.firebaseapp.com",
  projectId: "netflix-clone-a8c26",
  storageBucket: "netflix-clone-a8c26.firebasestorage.app",
  messagingSenderId: "634076271245",
  appId: "1:634076271245:web:0da36b716041c749f748c4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(" "));
    
  }

}

const logout = () => {
  signOut(auth);
}

export {auth, db, login, signup, logout};