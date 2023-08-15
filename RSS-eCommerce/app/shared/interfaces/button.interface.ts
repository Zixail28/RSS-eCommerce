import { ReactNode } from 'react';

export interface ButtonProps {
  type?: 'button' | 'submit';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}
