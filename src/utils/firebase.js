import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  inMemoryPersistence,
} from "firebase/auth";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();

let onUserLoggedInDisplayCallback = null;
let onUserLoggedInEmailCallback = null;

const setOnUserLoggedInDisplayCallback = (callback) => {
  onUserLoggedInDisplayCallback = callback;
};

const setOnUserLoggedInEmailCallback = (callback) => {
  onUserLoggedInEmailCallback = callback;
};

export const resumeUser = () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    if (user.displayName) {
      console.log("User's name:", user.displayName);
      onUserLoggedInDisplayCallback?.(user.displayName);
    }
    if (user.email) {
      console.log("User's email:", user.email);
      onUserLoggedInEmailCallback?.(user.email);
    }
  }
};

const logInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  //user can choose account
  provider.setCustomParameters({ prompt: "select_account" });

  try {
    await setPersistence(auth, browserLocalPersistence);
    console.log("setPersistence");

    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    localStorage.setItem("user", JSON.stringify(user));
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    if (user.displayName) {
      console.log("User's name:", user.displayName);
      onUserLoggedInDisplayCallback?.(user.displayName);
    }
    if (user.email) {
      console.log("User's email:", user.email);
      onUserLoggedInEmailCallback?.(user.email);
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    console.log("setPersistence");
    
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Signed in with email and password");
  } catch (error) {
    console.error("Caught error", error);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    //create user document in firestore
    await addDoc(collection(db, `users/${user.uid}/receipt`), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    console.log("Registered with email and password");
    if (user.uid) {
      console.log("User's name:", user.displayName);
      if (onUserLoggedInDisplayCallback) {
        onUserLoggedInDisplayCallback(user.displayName);
      }
    }
  } catch (error) {
    console.error("Caught error", error);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent");
  } catch (error) {
    console.error("Caught error", error);
  }
};

const logOut = () => {
  auth.signOut();
};

export {
  auth,
  db,
  storage,
  logInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logOut,
  setOnUserLoggedInDisplayCallback,
  setOnUserLoggedInEmailCallback,
};
// Path: src/utils/algolia.js
