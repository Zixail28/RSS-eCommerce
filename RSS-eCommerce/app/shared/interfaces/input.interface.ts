import { ChangeEvent, FocusEvent } from 'react';

export type InputProps = {
  type: string;
  id?: string;
  placeholder?: string;
  error?: string;
  checked?: boolean;
  showPasswordIcon?: boolean;
  value?: string | boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
};
