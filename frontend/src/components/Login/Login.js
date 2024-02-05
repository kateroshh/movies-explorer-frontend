import './Login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import HeaderLogo from '../HeaderLogo/HeaderLogo';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
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
          className='login-form__input'
          type='email'
          name='email'
          id='email'
          placeholder='Введите ваш email'
          onChange={handleChangeEmail}
          value={email || ''}
        />
        <label className='login-form__label' htmlFor='password'>
          Пароль
        </label>
        <input
          className='login-form__input login-form__input_last login-form__input_error'
          type='password'
          name='password'
          id='password'
          placeholder='Введите ваш пароль'
          onChange={handleChangePassword}
          value={password || ''}
        />
        <p className='login-form__error'></p>
        <div className='login-bottom'>
          <button className='login-bottom__submit' type='submit'>
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
