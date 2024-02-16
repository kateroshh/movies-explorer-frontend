import './Register.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import HeaderLogo from '../HeaderLogo/HeaderLogo';

function Register({ onRegister, errorRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [nameError, setNameError] = useState('Имя не может быть пустым');
  const [emailError, setEmailError] = useState('Email не может быть пустым');
  const [passwordError, setPasswordError] = useState(
    'Пароль не может быть пустым'
  );
  const [formValid, setFormValid] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (errorRegister) {
      if (errorRegister.includes('409')) {
        setErrorText('Пользователь с таким email уже существет');
      } else if (errorRegister.includes('400')) {
        setErrorText('Данные некорректные');
      } else {
        setErrorText('Ошибка на стороне сервера');
      }
    }
  }, [errorRegister]);

  useEffect(() => {
    if (nameError || emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError, passwordError]);

  function handleChangeName(e) {
    setName(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 30) {
      setNameError('Имя должен быть длиннее 3 символов и меньше 30 символов');
      setNameDirty(true);
      if (!e.target.value) {
        setNameError('Имя не может быть пустым');
        setNameDirty(true);
      }
    } else {
      setNameError('');
      setNameDirty(false);
    }
  }

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
    onRegister({ name, email, password });
  }

  function handleBlur(e) {
    switch (e.target.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  }

  return (
    <div className='register'>
      <HeaderLogo />
      <h1 className='register__title'>Добро пожаловать!</h1>
      <form className='register-form' name='registration' onSubmit={onSubmit}>
        <label className='register-form__label' htmlFor='name'>
          Имя
        </label>
        <input
          className={`register-form__input ${
            nameError ? 'register-form__input_error' : ''
          }`}
          type='text'
          name='name'
          id='name'
          placeholder='Введите ваше имя'
          minLength='2'
          maxLength='30'
          onChange={handleChangeName}
          onBlur={handleBlur}
          value={name || ''}
        />
        {nameDirty && nameError && (
          <div className='register-form__errorText'>{nameError}</div>
        )}
        <label className='register-form__label' htmlFor='email'>
          E-mail
        </label>
        <input
          className={`register-form__input ${
            emailError ? 'register-form__input_error' : ''
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
        <label className='register-form__label' htmlFor='password'>
          Пароль
        </label>
        <input
          className={`register-form__input register-form__input_last ${
            passwordError ? 'register-form__input_error' : ''
          }`}
          type='password'
          name='password'
          id='password'
          placeholder='Введите ваш пароль'
          minLength='3'
          maxLength='50'
          onChange={handleChangePassword}
          onBlur={handleBlur}
          value={password || ''}
        />
        {passwordDirty && passwordError && (
          <div className='register-form__errorText register-form__errorText_last'>
            {passwordError}
          </div>
        )}
        <p className='register-form__error'>{errorText}</p>
        <button
          className='register-form__submit'
          type='submit'
          disabled={!formValid}
        >
          Зарегистрироваться
        </button>
      </form>
      <div className='auth'>
        Уже зарегистрированы?
        <Link className='auth__link' to='/signin'>
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
