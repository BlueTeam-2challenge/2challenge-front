import axios from "axios";
import { auth, googleProvider, db } from "@services/firebaseConfig";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithRedirect,
} from "firebase/auth";
import { getDocs, query, collection, where, addDoc } from "firebase/firestore";

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
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.empty) {
      addDoc(usersCollection, {
        name: user.displayName,
        uid: user.uid,
        email: user.email,
      });
      await registerUserToMongo(user.displayName, user.email, user.uid);
    }
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error; // Re-throw error to be caught in the calling function
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
    return error;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out: ", error);
  }
};

export {
  signInWithGoogle,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  logout,
};
