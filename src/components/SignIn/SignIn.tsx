import { useState } from "react";
import styles from "./SignIn.module.css";
import { SignInProps } from "./types";

const SignIn = (props: SignInProps) => {
  const [hover, setHover] = useState(false);

  const buttonStyle = {
    backgroundColor: props.isActive
      ? hover
        ? "#209e6c"
        : "#26C485"
      : hover
      ? "#918274"
      : "#BAA898",
    textDecoration: "none",
    cursor: "pointer",
  };

  return (
    <div className={styles.signContainer}>
      <button
        style={buttonStyle}
        className={styles.btn}
        onClick={props.onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <p className={styles.btnText}>{props.label}</p>
      </button>
    </div>
  );
};

export default SignIn;
