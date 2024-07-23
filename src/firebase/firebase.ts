import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCs5KsW4tGOXHBByf7O-vqy3QjsJdiRGMI",
  authDomain: "challenge-blueteam.firebaseapp.com",
  projectId: "challenge-blueteam",
  storageBucket: "challenge-blueteam.appspot.com",
  messagingSenderId: "761192753",
  appId: "1:761192753:web:e85e05c74670c319281010",
  measurementId: "G-1TJL5Y0G8V",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };
