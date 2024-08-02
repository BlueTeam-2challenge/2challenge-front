import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import styles from "./Signup.module.css";
import { Logo } from "@components/Logo/index";
import { TextInput } from "@components/TextInput/index";
import SignIn from "@components/SignIn/SignIn";
import GoogleButton from "@components/GoogleButton/GoogleButton";
import {
  signInWithGoogle,
  registerWithEmailAndPassword,
} from "@app/services/firebaseServices";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const navigate = useNavigate();

  const validateInputs = (): boolean => {
    let isValid = true;

    if (!name) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError(null);
    }

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

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError(null);
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
      await registerWithEmailAndPassword(name, email, password);
      toast.success("Registration successful!");
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setEmailError("Email already in use");
        toast.error("Email already in use.");
      } else if (error.code === "auth/weak-password") {
        setPasswordError("Password is too weak");
        toast.error("Password is too weak.");
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

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    errorSetter: React.Dispatch<React.SetStateAction<string | null>>,
    value: string
  ) => {
    setter(value);
    if (value) {
      errorSetter(null);
    }
  };

  return (
    <Container className={styles.container}>
      <ToastContainer />
      <Card className={styles.card}>
        <Card.Title className={styles.cardTitle}>
          <Logo variant={"default"} />
        </Card.Title>
        <Card.Text className={styles.cardText}>SIGN UP</Card.Text>
        <Card.Subtitle className={styles.cardSubtitle}>
          Create an account to start using the application
        </Card.Subtitle>
        <form
          className={styles.formWrapper}
          method="POST"
          onSubmit={handleSubmit}
        >
          <TextInput
            label="Name"
            name="name"
            type="text"
            value={name}
            onChange={(e) =>
              handleInputChange(setName, setNameError, e.target.value)
            }
            placeholder="Enter your name"
            error={nameError}
          />
          <TextInput
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) =>
              handleInputChange(setEmail, setEmailError, e.target.value)
            }
            placeholder="Enter your email"
            error={emailError}
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) =>
              handleInputChange(setPassword, setPasswordError, e.target.value)
            }
            placeholder="Enter your password"
            error={passwordError}
          />
          <TextInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              handleInputChange(
                setConfirmPassword,
                setConfirmPasswordError,
                e.target.value
              )
            }
            placeholder="Confirm your password"
            error={confirmPasswordError}
          />
          <Link to="/login" className={styles.link}>
            Already have an account? Sign in here
          </Link>
          <SignIn label="SIGN UP" isActive onClick={handleSubmit} />
          <GoogleButton
            label="SIGN UP WITH GOOGLE"
            onClick={handleGoogleSignIn}
          />
        </form>
      </Card>
    </Container>
  );
};

export default SignupPage;
