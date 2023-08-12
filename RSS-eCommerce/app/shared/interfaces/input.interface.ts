export interface InputProps {
  value?: string;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onBlur?: () => void;
  error?: string;
  showPasswordIcon?: boolean;
}
