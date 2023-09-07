import { FC, useState, forwardRef } from "react";
import { InputProps } from "../../../shared/interfaces/input.interface";
import style from "../Input/Input.module.scss";

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      id,
      placeholder = "",
      value = "",
      error,
      defaultChecked,
      onChange,
      onBlur,
      showPasswordIcon = false,
    },
    ref,
  ) => {
    const [inputType, setInputType] = useState(type);

    const togglePasswordVisibility = () => {
      setInputType((prevType) =>
        prevType === "password" ? "text" : "password",
      );
    };

    return (
      <div className={style.input__wrapper}>
        <input
          id={id}
          className={`${style.input} ${error ? `${style.error__input}` : ""}`}
          placeholder={placeholder}
          type={inputType}
          value={value as string | undefined}
          defaultChecked={defaultChecked}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
        />
        {showPasswordIcon && (
          <div
            className={style.password__icon}
            onClick={togglePasswordVisibility}
          >
            {inputType === "password" ? "🙈" : "👁️"}
          </div>
        )}
        {error && <p className={style.error}>{error as string}</p>}
      </div>
    );
  },
);

export default Input;
