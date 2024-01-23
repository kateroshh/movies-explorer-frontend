import './Login.css';
import { Link } from 'react-router-dom';

import HeaderLogo from '../HeaderLogo/HeaderLogo';

function Login() {
  return (
    <div className='login'>
      <HeaderLogo />
      <h1 className='login__title'>Рады видеть!</h1>
      <form className='login-form'>
        <label className='login-form__label' for='email'>
          E-mail
        </label>
        <input
          className='login-form__input'
          type='text'
          name='email'
          id='email'
        />
        <label className='login-form__label' for='password'>
          Пароль
        </label>
        <input
          className='login-form__input login-form__input_last login-form__input_error'
          type='password'
          name='password'
          id='password'
        />
        <p className='login-form__error'></p>
        <div className='login-bottom'>
          <button className='login-bottom__submit'>Войти</button>

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