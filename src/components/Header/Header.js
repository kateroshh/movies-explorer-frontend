import './Header.css';

import HeaderLogo from '../HeaderLogo/HeaderLogo';
import userAccountAuth from '../../images/user-account_auth.svg';
import userAccountMain from '../../images/user-account_main.svg';
import { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';

function Header() {
  const [nav, setNav] = useState(false);

  const url = useLocation().pathname;
  const isMain = url === '/' ? true : false;
  const userAccountImg = url === '/' ? userAccountMain : userAccountAuth;
  const setStyle = ({ isActive }) =>
    [
      'link',
      isActive ? 'link_active' : '',
      isMain ? 'link_main-page' : '',
    ].join(' ');

  const setStyleMainLink = ({ isActive }) =>
    [
      'link',
      isActive ? 'link_active' : '',
      isMain ? 'link_main-page' : '',
      // nav ? '' : 'link_main',
    ].join(' ');

  const setStyleProfile = ({ isActive }) =>
    [
      'user-account__link link',
      isActive ? 'link_active' : '',
      isMain ? 'link_main-page' : '',
    ].join(' ');

  const handleOpenMenu = () => {
    setNav(!nav);
  };

  const handleCloseMenu = () => {
    setNav(false);
  };

  return (
    <header className='header'>
      <HeaderLogo />

      <div
        className={`header__container ${nav ? 'header__container_active' : ''}`}
      >
        <div className='user-movies'>
          <ul className='nav'>
            <li className={`nav-item ${nav ? '' : 'nav-item_main'}`}>
              <NavLink className={setStyleMainLink} to='/'>
                Главная
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className={setStyle} to='/movies'>
                Фильмы
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className={setStyle} to='/saved-movies'>
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <div className='user-account'>
            <NavLink className={setStyleProfile} to='/profile'>
              Аккаунт
            </NavLink>
            <img
              className='user-account__img'
              src={userAccountImg}
              alt='Аккаунт'
            />
          </div>
        </div>
      </div>

      <div className='auth-btns'>
        <NavLink className='auth-btns__reg' to='/signup'>
          Регистрация
        </NavLink>
        <NavLink className='auth-btns__login' to='/signin'>
          Войти
        </NavLink>
      </div>

      <div className='header-menu'>
        {nav ? (
          <button
            onClick={handleCloseMenu}
            className='header-menu__close'
          ></button>
        ) : (
          <button
            onClick={handleOpenMenu}
            className='header-menu__open'
          ></button>
        )}
      </div>
    </header>
  );
}

export default Header;
