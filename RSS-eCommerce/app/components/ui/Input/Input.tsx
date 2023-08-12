import { FC, useState } from 'react';
import { InputProps } from '../../../shared/interfaces/input.interface';
import style from '../Input/Input.module.scss';

const Input: FC<InputProps> = ({
  onChange,
  value,
  type = 'text',
  placeholder = '',
  onBlur,
  error,
  showPasswordIcon = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={style.input__wrapper}>
      <input
        className={style.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={isPasswordVisible ? 'text' : type}
        onBlur={onBlur}
      />
      {showPasswordIcon && (
        <div
          className={style.password__icon}
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? '🙈' : '👁️'}
        </div>
      )}
      {error && <p className={style.input__error}>{error}</p>}
    </div>
  );
};

export default Input;
