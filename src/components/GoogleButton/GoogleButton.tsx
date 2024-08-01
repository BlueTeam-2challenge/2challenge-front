import React from "react";
import styles from "./GoogleButton.module.css";
import { GoogleLoginButtonProps } from "./Types";

const GoogleLoginButton = (props: GoogleLoginButtonProps) => {
  return (
    <div className={styles.signContainer}>
      <button className={styles.btn} onClick={props.onClick}>
        <img
          src="../../../src/assets/images/google-icon.svg"
          alt="Google Icon"
          className={styles.icon}
        />
        <p className={styles.btnText}>{props.label}</p>
      </button>
    </div>
  );
};

export default GoogleLoginButton;
