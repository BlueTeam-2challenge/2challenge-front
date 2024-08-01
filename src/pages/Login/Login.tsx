import { Card, Container } from "react-bootstrap";
import "./Loginpage.css";
import { Logo } from "@components/Logo/index";
import { TextInput } from "@components/TextInput/index";
import SignIn from "@components/SignIn/SignIn";
import GoogleButton from "@components/GoogleButton/GoogleButton";

const LoginPage = () => {
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

        <TextInput
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
        <TextInput
          label="Password"
          name="passoword"
          type="password"
          placeholder="Enter your password"
        />
        <SignIn label="SIGN IN" isActive={true} />
        <GoogleButton label="SIGN IN WITH GOOGLE" />
      </Card>
    </Container>
  );
};

export default LoginPage;
