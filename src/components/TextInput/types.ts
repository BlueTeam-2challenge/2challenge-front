export interface TextInputProps {
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}
