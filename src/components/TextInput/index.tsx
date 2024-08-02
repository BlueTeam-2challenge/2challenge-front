import { useState } from "react";
import styles from "./TextInput.module.css";
import { TextInputProps } from "./types";

export function TextInput(props: TextInputProps) {
  const [error, setError] = useState<string>("");

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={props.name} className={styles.inputLabel}>
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onBlur={props.onBlur}
        onChange={props.onChange}
        className={error ? styles.textInputError : styles.textInput}
      />
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  );
}
