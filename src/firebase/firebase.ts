import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const registerUserToMongo = async (
  name: string | null,
  email: string | null,
  uid: string
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/register`,
      {
        uid,
        name,
        email,
      },
      {
        headers: {
          "Content-Type": "application/json", // Certifique-se de que o Content-Type está correto
        },
      }
    );
    console.log("User registered successfully", response.data);
  } catch (err) {
    console.log(err);
  }
};

const signInWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, googleProvider);
    const user = response.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.empty) {
      await registerUserToMongo(user.displayName, user.email, user.uid);
    }
  } catch (error) {
    console.log(error);
  }
};

const registerWithEmailAndPassword = async (
  name: string | null,
  email: string,
  password: string
) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    console.log(user.uid);
    await registerUserToMongo(name, email, user.uid);
  } catch (error) {
    console.log(error);
  }
};

const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    return error;
  }
};

export {
  auth,
  signInWithGoogle,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  logout,
};
