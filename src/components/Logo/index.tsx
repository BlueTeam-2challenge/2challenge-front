import styles from "./Logo.module.css";
import { LogoProps } from "./types";

export const Logo = ({ variant }: LogoProps) => {
  return (
    <div
      className={variant === "default" ? styles.logoDefault : styles.logoSmall}
    >
      <h1
        className={
          variant === "default" ? styles.logoText : styles.logoTextSmall
        }
      >
        CRUD OPERATIONS
      </h1>
    </div>
  );
};
