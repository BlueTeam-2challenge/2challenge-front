import styles from "./NavButton.module.css";
import { ButtonLinkProps } from "./types";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavButton = (props: ButtonLinkProps) => {
  const [hover, setHover] = useState(false);
  const location = useLocation();

  const isActive = location.pathname === props.to;

  const buttonStyle = {
    backgroundColor: isActive ? "#26C485" : "#EEE0CB",
    textDecoration: "none",
    cursor: "pointer",
  };

  return (
    <div className={styles.container}>
      <Link
        to={props.to}
        style={buttonStyle}
        className={styles.btn}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {props.label === "Logout" ? (
          <>
            <p className={styles.btnTextPage}>{props.label}</p>
            <img src={props.icon} alt="page-icon" className={styles.btnIconPage} />
          </>
        ) : (
          <>
            <img src={props.icon} alt="page-icon" className={styles.btnIconPage} />
            <p className={styles.btnTextPage}>{props.label}</p>
          </>
        )}
      </Link >
    </div>
  );
};

export default NavButton;
