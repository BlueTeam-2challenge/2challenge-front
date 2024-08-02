import React from "react";
import styles from "./TextInput.module.css";
import { TextInputProps } from "./types";

export function TextInput(props: TextInputProps) {
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
        value={props.value}
        disabled={props.disabled}
        className={props.error ? styles.textInputError : styles.textInput}
      />
      {props.error && <span className={styles.errorMsg}>{props.error}</span>}
    </div>
  );
}
