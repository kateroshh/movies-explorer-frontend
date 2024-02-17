import './Movies.css';
import { useEffect, useState } from 'react';
import searchMovies from '../../utils/search-movies';
import { useLocalStorageState as useStorage } from '../../utils/hooks';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ windowSize }) {
  const [request, setRequest] = useStorage('request', '');
  const [isShortFilms, setIsShortFilms] = useStorage('isShortFilms', false);
  const [movies, setMovies] = useStorage('movies', []);
  const [listMovies, setListMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    filterMovies();

    Promise.all([moviesApi.getMovies(), mainApi.getSavedMovies()])
      .then(([moviesData, savedMoviesApi]) => {
        setSavedMovies(savedMoviesApi);
        setMovies(moviesData);
      })
      .catch((err) => {
        // setErrorText(err.message || err);
        setErrorText(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        );
      });
  }, []);

  useEffect(() => {
    filterMovies();
  }, [request, isShortFilms]);

  function filterMovies() {
    if (request || request !== '' || request !== undefined) {
      const filteredMovies = movies.filter((movie) =>
        searchMovies(movie, request, isShortFilms)
      );
      setListMovies(filteredMovies);
    }
  }

  const handleChangeRequest = (value) => {
    setRequest(value);
    if (value === '') {
      setErrorText('Нужно ввести ключевое слово');
    } else {
      setErrorText('');
    }
  };

  const handleChangeShortFilms = (value) => {
    setIsShortFilms(value);
  };

  return (
    <section className='movies'>
      <SearchForm
        onClick={handleChangeRequest}
        onChangeCheckbox={handleChangeShortFilms}
        screen={'movies'}
      />
      {errorText ? (
        <div className='movies__error'>{errorText}</div>
      ) : request === '' || request === undefined ? (
        <Preloader />
      ) : listMovies.length === 0 ? (
        <div className='movies__error'>Ничего не найдено</div>
      ) : (
        <MoviesCardList
          movies={listMovies}
          windowSize={windowSize}
          screen={'movies'}
          savedMovies={savedMovies}
        />
      )}
    </section>
  );
}

export default Movies;
