import { FC } from 'react';
import { ButtonProps } from '../../../shared/interfaces/button.interface';
import style from '../button/Button.module.scss';

const Button: FC<ButtonProps> = ({
  onClick,
  children,
  type = 'button',
  color = 'red',
}) => {
  return (
    <button
      type={type}
      color={color}
      className={style.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
