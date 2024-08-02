import axios from "axios";
import { auth, googleProvider, db } from "./firebaseConfig";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDocs, query, collection, where } from "firebase/firestore";

const registerUserToMongo = async (
  name: string | null,
  email: string | null,
  uid: string
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/register`,
      { uid, name, email },
      { headers: { "Content-Type": "application/json" } }
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
  signInWithGoogle,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  logout,
};
