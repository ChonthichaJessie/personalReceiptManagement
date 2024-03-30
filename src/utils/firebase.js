import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  
  apiKey: "AIzaSyD3RtJUUsBuocFfrXst0QJpbGfG2LTAz2Y",
  authDomain: "receiptmanagement-1d51d.firebaseapp.com",
  projectId: "receiptmanagement-1d51d",
  storageBucket: "receiptmanagement-1d51d.appspot.com",
  messagingSenderId: "852913556492",
  appId: "1:852913556492:web:6b65c58bfec0992ac47229"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
