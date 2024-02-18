import './Login.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import HeaderLogo from '../HeaderLogo/HeaderLogo';

function Login({ onLogin, errorLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Email не может быть пустым');
  const [passwordError, setPasswordError] = useState(
    'Пароль не может быть пустым'
  );
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (errorLogin) {
      if (errorLogin.includes('401')) {
        setErrorText('Неправильный логин или пароль');
      } else {
        setErrorText('Ошибка на стороне сервера');
      }
    }
  }, [errorLogin]);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    if (!e.target.value) {
      setEmailError('Email не может быть пустым');
      setEmailDirty(true);
    } else {
      const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!re.test(String(e.target.value).toLowerCase())) {
        setEmailError('Некоррейтный email');
        setEmailDirty(true);
      } else {
        setEmailError('');
        setEmailDirty(false);
      }
    }
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 50) {
      setPasswordError(
        'Пароль должен быть длиннее 3 символов и меньше 50 символов'
      );
      setPasswordDirty(true);
      if (!e.target.value) {
        setPasswordError('Пароль не может быть пустым');
        setPasswordDirty(true);
      }
    } else {
      setPasswordError('');
      setPasswordDirty(false);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }

  function handleBlur(e) {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  }

  return (
    <div className='login'>
      <HeaderLogo />
      <h1 className='login__title'>Рады видеть!</h1>
      <form className='login-form' name='login' onSubmit={onSubmit}>
        <label className='login-form__label' htmlFor='email'>
          E-mail
        </label>
        <input
          className={`login-form__input ${
            emailError ? 'login-form__input_error' : ''
          }`}
          type='email'
          name='email'
          id='email'
          placeholder='Введите ваш email'
          onChange={handleChangeEmail}
          onBlur={handleBlur}
          value={email || ''}
        />
        {emailDirty && emailError && (
          <div className='register-form__errorText'>{emailError}</div>
        )}
        <label className='login-form__label' htmlFor='password'>
          Пароль
        </label>
        <input
          className={`login-form__input login-form__input_last ${
            passwordError ? 'login-form__input_error' : ''
          }`}
          type='password'
          name='password'
          id='password'
          placeholder='Введите ваш пароль'
          onChange={handleChangePassword}
          onBlur={handleBlur}
          value={password || ''}
        />
        {passwordDirty && passwordError && (
          <div className='login-form__errorText login-form__errorText_last'>
            {passwordError}
          </div>
        )}
        <p className='login-form__error'>{errorText}</p>
        <div className='login-bottom'>
          <button
            className='login-bottom__submit'
            type='submit'
            disabled={!formValid}
          >
            Войти
          </button>

          <div className='reg'>
            Ещё не зарегистрированы?
            <Link className='reg__link' to='/signup'>
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
