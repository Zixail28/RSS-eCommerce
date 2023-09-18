import { FC } from "react";
import { ButtonProps } from "../../../shared/interfaces/button.interface";
import style from "../Button/Button.module.scss";

const Button: FC<ButtonProps> = ({
  onClick,
  children,
  type = "button",
  color = "red",
  styles,
}) => {
  return (
    <button
      type={type}
      color={color}
      className={style.button}
      style={styles}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
