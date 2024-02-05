import './Profile.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as token from '../../utils/token';

function Profile({ userData, onExit }) {
  const [name, setName] = useState(userData.name || '');
  const [email, setEmail] = useState(userData.email || '');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleRemoveToken() {
    token.removeToken();
    onExit();
  }

  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <form className='profile-form'>
        <fieldset className='profile-form-gr'>
          <label className='profile-form-gr__label' htmlFor='name'>
            Имя
            <input
              className='profile-form-gr__input'
              type='text'
              name='name'
              id='name'
              placeholder='Введите ваше имя'
              minLength='2'
              maxLength='30'
              onChange={handleChangeName}
              value={name || ''}
            />
          </label>

          <label className='profile-form-gr__label' htmlFor='email'>
            E-mail
            <input
              className='profile-form-gr__input'
              type='email'
              name='email'
              id='email'
              placeholder='Введите ваш email'
              onChange={handleChangeEmail}
              value={email || ''}
            />
          </label>
        </fieldset>

        <div className='profile-btns'>
          <button className='profile-btns__edit' type='submit'>
            Редактировать
          </button>
          <Link
            className='profile-btns__exit'
            to='/'
            onClick={handleRemoveToken}
          >
            Выйти из аккаунта
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Profile;
