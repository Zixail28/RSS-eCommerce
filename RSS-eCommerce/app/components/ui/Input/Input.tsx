import { FC, useState } from 'react';
import { InputProps } from '../../../shared/interfaces/input.interface';
import style from '../Input/Input.module.scss';

const Input: FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  error,
  onChange,
  onBlur,
  showPasswordIcon = false,
}) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  return (
    <div className={style.input__wrapper}>
      <input
        className={style.input}
        placeholder={placeholder}
        type={inputType}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
      {showPasswordIcon && (
        <div
          className={style.password__icon}
          onClick={togglePasswordVisibility}
        >
          {inputType === 'password' ? '🙈' : '👁️'}
        </div>
      )}
      {error && <p className={style.input__error}>{error}</p>}
    </div>
  );
};

export default Input;
