import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2Exj_uTC_NL1WzvZmxeVCnZDGK0gxhpQ",
  authDomain: "crwn-clothing-db-6618b.firebaseapp.com",
  projectId: "crwn-clothing-db-6618b",
  storageBucket: "crwn-clothing-db-6618b.appspot.com",
  messagingSenderId: "411093429031",
  appId: "1:411093429031:web:ca0abe3b36293ac5279702"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo={}) => {
  if (!userAuth) return;
  
  const userDocRef = doc(db, 'users', userAuth.uid );

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  // if user data exists

  // if user data does not exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch(error) { 
         console.log(error);
        if (error.code === 400)  {
          alert('Cannot create user, email already in use.')
        } else {
          console.log('error creating the user', error); 
      }
    }
  
    return userDocRef;
  }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  
  return await createUserWithEmailAndPassword(auth, email, password);
}