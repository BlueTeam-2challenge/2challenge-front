import { HTMLInputTypeAttribute } from "react";

export interface TextInputProps {
  label: string;
  value: string;
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  error?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  disabled?: boolean;
}
