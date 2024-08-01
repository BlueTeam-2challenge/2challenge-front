import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredentials = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        { email, password }
      );
      console.log(userCredentials);
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
    </div>
  );
}
