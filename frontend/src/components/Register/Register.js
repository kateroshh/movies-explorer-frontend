import './Register.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import HeaderLogo from '../HeaderLogo/HeaderLogo';

function Register({ onRegister, errorRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    onRegister({ name, email, password });
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
          className='register-form__input'
          type='text'
          name='name'
          id='name'
          placeholder='Введите ваше имя'
          minLength='2'
          maxLength='30'
          onChange={handleChangeName}
          value={name || ''}
        />
        <label className='register-form__label' htmlFor='email'>
          E-mail
        </label>
        <input
          className='register-form__input'
          type='email'
          name='email'
          id='email'
          placeholder='Введите ваш email'
          onChange={handleChangeEmail}
          value={email || ''}
        />
        <label className='register-form__label' htmlFor='password'>
          Пароль
        </label>
        <input
          className='register-form__input register-form__input_last register-form__input_error'
          type='password'
          name='password'
          id='password'
          placeholder='Введите ваш пароль'
          minLength='3'
          maxLength='50'
          onChange={handleChangePassword}
          value={password || ''}
        />
        <p className='register-form__error'>{errorText}</p>
        <button className='register-form__submit' type='submit'>
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
