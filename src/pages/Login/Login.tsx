import React, { useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import styles from "./Login.module.css";
import { Logo } from "@components/Logo/index";
import SignIn from "@components/SignIn/SignIn";
import GoogleButton from "@components/GoogleButton/GoogleButton";
import {
  loginWithEmailAndPassword,
  signInWithGoogle,
} from "@app/services/firebaseServices";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoginForm } from "@app/hooks/useForms";
import { LoginSchema } from "@app/schemas/userLoginSchema";

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, errors } = useLoginForm();
  const onSubmit = async (data: LoginSchema) => {
    try {
      await loginWithEmailAndPassword(data.email, data.password);
      toast.success("Logged in successfully!", {
        position: "top-center",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "bottom-center",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    const response = await signInWithGoogle();
    console.log(response);
    toast.success("Signed in with Google successfully!", {
      position: "top-center",
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  useEffect(() => {
    document.title = "Login 🐶 - Challenge Compass";
  }, []);
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && <small>{errors.email.message}</small>}
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && <small>{errors.password.message}</small>}
          <Link to="/signup" className={styles.link}>
            Don't have an account? Sign up here
          </Link>
          <SignIn label="SIGN IN" isActive onClick={handleSubmit(onSubmit)} />
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
