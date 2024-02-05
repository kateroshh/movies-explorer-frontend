import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
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

  useEffect(() => {
    // Promise.all([moviesApi.getUserInfo(), moviesApi.getInitialCards()])
    Promise.all([mainApi.getUserInfo(), moviesApi.getMovies()])
      .then(([userData, moviesData]) => {
        setCurrentUser(userData);
        setMovies(moviesData);
      })
      .catch((err) => {
        console.log(
          'Ошибка получения данных пользователя и первоначального списка карточек',
          err
        );
      });
    console.log(currentUser);
  }, []);

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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route index element={<Main />} />
          <Route path='/' element={<Layout />}>
            <Route
              path='movies'
              element={<Movies movies={movies} windowSize={windowResizing} />}
            />
            <Route path='saved-movies' element={<SavedMovies />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path='signin' element={<Login />} />
          <Route path='signup' element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
