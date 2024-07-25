import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, name });
    try {
      const userCredentials = await axios.post(
        "http://localhost:3001/api/register",
        { email, password, name }
      );
      console.log(userCredentials);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signupWrapper">
      <h1>Sign Up</h1>
      <form className="formWrapper" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
