import { ReactNode } from "react";

export interface ButtonProps {
  type?: "button" | "submit";
  color?: "red" | "blue" | "green";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}
