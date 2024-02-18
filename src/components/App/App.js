import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [windowResizing, setWindowResizing] = useState([0, 0, false]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [errorRegister, setErrorRegister] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = token.getToken();

    if (jwt && jwt !== 'undefined') {
      auth
        .checkToken()
        .then((res) => {
          setLoggedIn(true);

          setUserData({ id: res._id, name: res.name, email: res.email });
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  // useEffect(() => {
  //   if (loggedIn) {
  //     Promise.all([mainApi.getUserInfo(), moviesApi.getMovies()])
  //       .then(([userData, moviesData]) => {
  //         setCurrentUser(userData);
  //         setMovies(moviesData);
  //       })
  //       .catch((err) => {
  //         console.log(
  //           'Ошибка получения данных пользователя и первоначального списка фильмов',
  //           err
  //         );
  //       });
  //   }
  // }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo()])
        .then(([userData]) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log('Ошибка получения данных пользователя', err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      navigate('/movies');
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

    token.setToken(res.id);
    navigate('/movies', { replace: true });
  }

  function handleLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (!res || res.statusCode === 401) {
          setErrorLogin(res.error);
        } else {
          console.log('Авторизация прошла успешно');
          handleUserInfo(res);
        }
      })
      .catch((err) => {
        setErrorLogin(err.message || err);
      });
  }

  function handleRegister({ name, email, password }) {
    auth
      .register(name, email, password)
      .then((res) => {
        if (!res || res.statusCode === 400 || res?.error) {
          setErrorRegister(res.error);
        } else {
          handleUserInfo(res);
        }
      })
      .catch((err) => {
        setErrorRegister(err.message || err);
      });
  }

  function handleExitClick() {
    setLoggedIn(false);
    localStorage.removeItem('movies');
    localStorage.removeItem('request');
    localStorage.removeItem('isShortFilms');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route
            path='*'
            element={loggedIn ? <Navigate to='/' /> : <Navigate to='signin' />}
          />
          <Route
            index
            element={<ProtectedRoute loggedIn={loggedIn} component={Main} />}
          />
          <Route path='/' element={<Layout loggedIn={loggedIn} />}>
            <Route
              path='movies'
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  windowSize={windowResizing}
                  component={Movies}
                />
              }
            />
            <Route
              path='saved-movies'
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  windowSize={windowResizing}
                  component={SavedMovies}
                />
              }
            />
            <Route
              path='profile'
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  windowSize={windowResizing}
                  userData={userData}
                  onExit={handleExitClick}
                  component={Profile}
                />
              }
            />
          </Route>
          <Route
            path='signin'
            element={<Login onLogin={handleLogin} errorLogin={errorLogin} />}
          />
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
