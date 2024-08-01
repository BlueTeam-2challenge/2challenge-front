import { Card, Container, Form, Button } from "react-bootstrap";
import "./Loginpage.css";
import { Logo } from "@components/Logo/index";
import { TextInput } from "@components/TextInput/index";
import SignIn from "@components/SignIn/SignIn";
import GoogleButton from "@components/GoogleButton/GoogleButton";
import {
  loginWithEmailAndPassword,
  signInWithGoogle,
} from "@app/services/firebaseServices";
import { useState } from "react";
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
    <Container className="container">
      <Card className="card" style={{ backgroundColor: "white" }}>
        <Card.Title className="card-title">
          <Logo variant="default" />
        </Card.Title>
        <Card.Text className="card-text"> SIGN IN</Card.Text>
        <Card.Subtitle className="card-subtitle">
          Enter your credentials to access your account
        </Card.Subtitle>

        <SignIn label="SIGN IN" isActive />
        <GoogleButton
          onClick={handleGoogleSignIn}
          label="SIGN IN WITH GOOGLE"
        />
      </Card>
    </Container>
  );
};

export default LoginPage;
