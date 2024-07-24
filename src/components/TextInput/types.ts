export interface TextInputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  error?: string;
  onChange?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
}
