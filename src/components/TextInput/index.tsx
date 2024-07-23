import React, { useState, ChangeEvent, FocusEvent } from "react";
import styles from "./TextInput.module.css";
import { TextInputProps } from "./types";

export function TextInput(props: TextInputProps) {
  const [error, setError] = useState<string>("");

  const validate = (value: string): string => {
    let errorMessage = "";
    if (!value && value.length < 3) {
      errorMessage = "Required Field";
    }
    return errorMessage;
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const validationError = validate(event.target.value);
    setError(validationError);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError("");
    props.onChange(event);
  };

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={props.name} className={styles.inputLabel}>
        {props.label}
      </label>
      <input
        type="text"
        name={props.name}
        placeholder={props.placeholder}
        onBlur={handleBlur}
        onChange={handleChange}
        className={error ? styles.textInputError : styles.textInput}
      />
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  );
}
