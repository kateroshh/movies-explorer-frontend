import './Register.css';
import { Link } from 'react-router-dom';

import HeaderLogo from '../HeaderLogo/HeaderLogo';

function Register() {
  return (
    <div className='register'>
      <HeaderLogo />
      <h1 className='register__title'>Добро пожаловать!</h1>
      <form className='register-form'>
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
