import { FC } from 'react';
import { ButtonProps } from '../../../shared/interfaces/button.interface';
import style from '../button/Button.module.scss';

const Button: FC<ButtonProps> = ({ onClick, text, type = 'button' }) => {
  return (
    <button type={type} className={style.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
