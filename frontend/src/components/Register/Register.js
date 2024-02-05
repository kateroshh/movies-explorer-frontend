import './Register.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import HeaderLogo from '../HeaderLogo/HeaderLogo';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    console.log('OK');
  }

  return (
    <div className='register'>
      <HeaderLogo />
      <h1 className='register__title'>Добро пожаловать!</h1>
      <form className='register-form' name='registration' onSubmit={onSubmit}>
        <label className='register-form__label' for='name'>
          Имя
        </label>
        <input
          className='register-form__input'
          type='text'
          name='name'
          id='name'
          placeholder='Введите ваше имя'
          minlength='3'
          maxlength='50'
          onChange={handleChangeName}
          value={name || ''}
        />
        <label className='register-form__label' for='email'>
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
        <label className='register-form__label' for='password'>
          Пароль
        </label>
        <input
          className='register-form__input register-form__input_last register-form__input_error'
          type='password'
          name='password'
          id='password'
          placeholder='Введите ваш пароль'
          minlength='3'
          maxlength='50'
          onChange={handleChangePassword}
          value={password || ''}
        />
        <p className='register-form__error'>Что-то пошло не так...</p>
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
