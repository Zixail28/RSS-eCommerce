import { FC, useState } from 'react';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
import style from '../Login/Login.module.scss';
import authImg from '../../assets/images/auth.jpg';

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!isValidEmail(newEmail)) {
      if (!email.includes('@')) {
        setEmailError('Email address must contain an "@" symbol.');
      } else if (!email.trim()) {
        setEmailError(
          'Email address must not contain leading or trailing whitespace.'
        );
      } else if (email.includes(' ')) {
        setEmailError('Email address must not contain spaces.');
      } else if (!email.endsWith('.')) {
        setEmailError(
          'Email address must contain a valid domain name (e.g., example.com).'
        );
      } else {
        setEmailError('Email address is not valid.');
      }
    } else {
      setEmailError('');
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.trim() === '') {
      setPasswordError('Password is required.');
    }

    if (email.trim() === '') {
      setEmailError('Email is required.');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validatePassword = (password: string) => {
    if (password.trim() === '') {
      setPasswordError('Password is required.');
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError(
        'Password must contain at least one uppercase letter (A-Z).'
      );
    } else if (!/[a-z]/.test(password)) {
      setPasswordError(
        'Password must contain at least one lowercase letter (a-z).'
      );
    } else if (!/\d/.test(password)) {
      setPasswordError('Password must contain at least one digit (0-9).');
    } else if (!/[!@#$%^&*]/.test(password)) {
      setPasswordError('Password must contain at least one special character.');
    } else if (password !== password.trim()) {
      setPasswordError(
        'Password must not contain leading or trailing whitespace.'
      );
    } else {
      setPasswordError('');
    }
  };

  return (
    <>
      <div className={style.wrapper}>
        <img src={authImg} alt="cart" width="600" />
        <div className={style.login__wrapper}>
          <h1 className={style.login__title}>Log in to Exclusive</h1>
          <p className={style.login__subtitle}>Enter your details below</p>
          <form onSubmit={handleSubmit}>
            <div className={style.input}>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
              />
            </div>
            <div className={style.input}>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                error={passwordError}
                showPasswordIcon={true}
              />
            </div>
            <Button text="Log in" type="submit"></Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
