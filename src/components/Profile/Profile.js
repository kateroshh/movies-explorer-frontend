import './Profile.css';

function Profile() {
  return (
    <div className='profile'>
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
            />
          </label>

          <label className='profile-form-gr__label' for='email'>
            E-mail
            <input
              className='profile-form-gr__input'
              type='text'
              name='email'
              id='email'
              value={'pochta@yandex.ru'}
            />
          </label>
        </fieldset>

        <div className='profile-btns'>
          <button className='profile-btns__edit'>Редактировать</button>
          <button className='profile-btns__exit'>Выйти из аккаунта</button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
