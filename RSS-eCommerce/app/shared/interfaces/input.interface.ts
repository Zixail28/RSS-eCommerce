import { ChangeEvent, FocusEvent } from 'react';
import { FieldError } from 'react-hook-form';

export type InputProps = {
  type: string;
  id?: string;
  placeholder?: string;
  error?: string | FieldError;
  checked?: boolean | string | null;
  defaultChecked?: boolean | undefined;
  showPasswordIcon?: boolean;
  value?: string | boolean | undefined | null;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
};
