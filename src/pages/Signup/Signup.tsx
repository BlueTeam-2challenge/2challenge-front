import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import styles from "./Signup.module.css";
import { Logo } from "@components/Logo/index";
import SignIn from "@components/SignIn/SignIn";
import GoogleButton from "@components/GoogleButton/GoogleButton";
import {
  signInWithGoogle,
  registerWithEmailAndPassword,
} from "@app/services/firebaseServices";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UserSchema } from "@app/schemas/userFormSchema";
import { useUserForm } from "@app/hooks/useForms";

const SignupPage = () => {
  const { register, handleSubmit, errors } = useUserForm();

  const onSubmit = (data: UserSchema) => {
    console.log(data);
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    toast.success("Signed in with Google successfully!");
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            id="name"
            placeholder="Enter your Name"
            {...register("name")}
          />
          {errors.name && <small>{errors.name.message}</small>}
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
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <small>{errors.confirmPassword.message}</small>
          )}
          <Link to="/login" className={styles.link}>
            Already have an account? Sign in here
          </Link>
          <SignIn label="SIGN UP" isActive onClick={handleSubmit(onSubmit)} />
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
