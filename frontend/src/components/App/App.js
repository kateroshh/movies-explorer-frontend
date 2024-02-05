import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import * as token from '../../utils/token';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Layout from '../Layout/Layout';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [windowResizing, setWindowResizing] = useState([0, 0, false]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [errorRegister, setErrorRegister] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = token.getToken();

    if (jwt && jwt !== 'undefined') {
      auth
        .checkToken()
        .then((res) => {
          setLoggedIn(true);
          setUserData({ name: res.name, email: res.email });
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // useEffect(() => {
  //   if (loggedIn) {
  //     navigate('/');
  //   }
  // }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), moviesApi.getMovies()])
        .then(([userData, moviesData]) => {
          setCurrentUser(userData);
          setMovies(moviesData);
        })
        .catch((err) => {
          console.log(
            'Ошибка получения данных пользователя и первоначального списка фильмов',
            err
          );
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    setWindowResizing([window.innerWidth, window.innerHeight, false]);

    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);

      setWindowResizing([window.innerWidth, window.innerHeight, true]);

      timeout = setTimeout(() => {
        setWindowResizing([window.innerWidth, window.innerHeight, false]);
      }, 200);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleUserInfo(res) {
    setLoggedIn(true);
    setUserData({ name: res.name, email: res.email });

    token.setToken(res._id);
    navigate('/movies', { replace: true });
  }

  function handleLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (!res || res.statusCode === 401) {
          console.log('Ошибка авторизации');
        } else {
          console.log('Авторизация прошла успешно');
          handleUserInfo(res);
        }
      })
      .catch((err) => {
        console.log('Ошибка авторизации');
      });
  }

  function handleRegister({ name, email, password }) {
    auth
      .register(name, email, password)
      .then((res) => {
        if (!res || res.statusCode === 400 || res?.error) {
          console.log('Ошибка регистрации');
          setErrorRegister(res.error);
        } else {
          handleUserInfo(res);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('Ошибка регистрации 2');
        setErrorRegister(err.message);
      });
  }

  function handleExitClick() {
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route
            path='*'
            element={loggedIn ? <Navigate to='/' /> : <Navigate to='signin' />}
          />
          <Route index element={<Main loggedIn={loggedIn} />} />
          <Route path='/' element={<Layout loggedIn={loggedIn} />}>
            <Route
              path='movies'
              element={<Movies movies={movies} windowSize={windowResizing} />}
            />
            <Route path='saved-movies' element={<SavedMovies />} />
            <Route
              path='profile'
              element={<Profile userData={userData} onExit={handleExitClick} />}
            />
          </Route>
          <Route path='signin' element={<Login onLogin={handleLogin} />} />
          <Route
            path='signup'
            element={
              <Register
                onRegister={handleRegister}
                errorRegister={errorRegister}
              />
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
