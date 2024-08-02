import { HTMLInputTypeAttribute } from "react";
export interface TextInputProps {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  error?: string;
  onChange?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
}
