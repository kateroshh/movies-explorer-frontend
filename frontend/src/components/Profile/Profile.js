import './Profile.css';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <form className='profile-form'>
        <fieldset className='profile-form-gr'>
          <label className='profile-form-gr__label' for='name'>
            Имя
            <input
              className='profile-form-gr__input'
              type='text'
              name='name'
              id='name'
              value={'Виталий'}
              placeholder='Введите ваше имя'
              minlength='3'
              maxlength='50'
            />
          </label>

          <label className='profile-form-gr__label' for='email'>
            E-mail
            <input
              className='profile-form-gr__input'
              type='email'
              name='email'
              id='email'
              value={'pochta@yandex.ru'}
              placeholder='Введите ваш email'
            />
          </label>
        </fieldset>

        <div className='profile-btns'>
          <button className='profile-btns__edit' type='submit'>
            Редактировать
          </button>
          <Link className='profile-btns__exit' to='/'>
            Выйти из аккаунта
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Profile;
