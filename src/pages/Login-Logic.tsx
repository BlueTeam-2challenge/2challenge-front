import React, { useState } from "react";
import {
  signInWithGoogle,
  loginWithEmailAndPassword,
} from "@services/firebaseServices";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginWithEmailAndPassword(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signupWrapper">
      <h1>Sign In</h1>
      <form className="formWrapper" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <h2>Login com o Google</h2>
      <button onClick={handleGoogleSignIn}>Login com Google</button>
    </div>
  );
}
