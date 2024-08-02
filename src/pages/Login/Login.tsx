import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import styles from "./Login.module.css";
import { Logo } from "@components/Logo/index";
import { TextInput } from "@components/TextInput/index";
import SignIn from "@components/SignIn/SignIn";
import GoogleButton from "@components/GoogleButton/GoogleButton";
import {
  loginWithEmailAndPassword,
  signInWithGoogle,
} from "@app/services/firebaseServices";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
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
    <Container className={styles.container}>
      <Card className={styles.card}>
        <Card.Title className={styles.cardTitle}>
          <Logo variant={"default"} />
        </Card.Title>
        <Card.Text className={styles.cardText}> SIGN IN</Card.Text>
        <Card.Subtitle className={styles.cardSubtitle}>
          Enter your credentials to access your account
        </Card.Subtitle>
        <div className={styles.formWrapper}>
          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          <SignIn label="SIGN IN" isActive />
          <GoogleButton
            label="SIGN IN WITH GOOGLE"
            onClick={handleGoogleSignIn}
          />
        </div>
      </Card>
    </Container>
  );
};

export default LoginPage;
