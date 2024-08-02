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
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateInputs = (): boolean => {
    let isValid = true;
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    try {
      await loginWithEmailAndPassword(email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setEmailError("Invalid email address");
        toast.error("Invalid email address.");
      } else if (error.code === "auth/wrong-password") {
        setPasswordError("Incorrect password");
        toast.error("Incorrect password.");
      } else {
        console.error(error);
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Signed in with Google successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Container className={styles.container}>
      <ToastContainer />
      <Card className={styles.card}>
        <Card.Title className={styles.cardTitle}>
          <Logo variant={"default"} />
        </Card.Title>
        <Card.Text className={styles.cardText}> SIGN IN</Card.Text>
        <Card.Subtitle className={styles.cardSubtitle}>
          Enter your credentials to access your account
        </Card.Subtitle>
        <form
          className={styles.formWrapper}
          method="POST"
          onSubmit={handleSubmit}
        >
          <TextInput
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            error={emailError}
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            error={passwordError}
          />
          <Link to="/signup" className={styles.link}>
            Don't have an account? Sign up here
          </Link>
          <SignIn label="SIGN IN" isActive onClick={handleSubmit} />
          <GoogleButton
            label="SIGN IN WITH GOOGLE"
            onClick={handleGoogleSignIn}
          />
        </form>
      </Card>
    </Container>
  );
};

export default LoginPage;
