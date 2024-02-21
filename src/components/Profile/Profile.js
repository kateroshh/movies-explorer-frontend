import './Profile.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as token from '../../utils/token';
import mainApi from '../../utils/MainApi';

function Profile({ userData, onExit }) {
  const [name, setName] = useState(userData.name || '');
  const [email, setEmail] = useState(userData.email || '');
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [nameError, setNameError] = useState('Имя не может быть пустым');
  const [emailError, setEmailError] = useState('Email не может быть пустым');
  const [formValid, setFormValid] = useState(false);
  const [formUpdate, setFormUpdate] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (nameError || emailError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError]);

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
      const re = /^[А-ЯA-ZёәіңғүұқөһӘІҢҒҮҰҚӨҺ\s-]+$/i;
      if (!re.test(String(e.target.value).toLowerCase())) {
        setNameError(
          'Имя может содержать только латиницу, кириллицу, пробел или дефис'
        );
        setNameDirty(true);
        setFormValid(false);
      } else {
        setNameError('');
        setNameDirty(false);
        setFormValid(true);
      }
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
        setFormValid(false);
      } else {
        setEmailError('');
        setEmailDirty(false);
        setFormValid(true);
      }
    }
  }

  function handleRemoveToken() {
    token.removeToken();
    onExit();
  }

  function handleSubmit(e) {
    e.preventDefault();
    mainApi
      .saveUserInfo(name, email)
      .then(() => {
        setFormUpdate(true);
        setFormValid(false);
        setErrorText('');
      })
      .catch((err) => {
        setErrorText(err.message || err);
      });
  }

  return (
    <section className='profile'>
      <h1 className='profile__title'>{`Привет, ${
        formUpdate ? name : userData.name
      }!`}</h1>
      <form className='profile-form' onSubmit={handleSubmit}>
        <fieldset className='profile-form-gr'>
          {nameDirty && nameError && (
            <div className='profile-form-gr__errorText'>{nameError}</div>
          )}
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
          {emailDirty && emailError && (
            <div className='profile-form-gr__errorText'>{emailError}</div>
          )}
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
          {errorText && <p className='profile-btns__error'>{errorText}</p>}
          {!errorText && formUpdate && (
            <p className='profile-btns__update'>Данные успешно обновлены</p>
          )}
          <button
            className='profile-btns__edit'
            type='submit'
            disabled={!formValid}
          >
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
