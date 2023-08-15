export type InputProps = {
  type: string;
  placeholder: string;
  error?: string;
  showPasswordIcon?: boolean;
  value: string;
  onChange: (newValue: string) => void;
  onBlur: () => void;
};
