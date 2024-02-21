import './SavedMovies.css';
import { useEffect, useState } from 'react';
import { useLocalStorageState as useStorage } from '../../utils/hooks';
import mainApi from '../../utils/MainApi';
import searchMovies from '../../utils/search-movies';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ windowSize }) {
  const [requestSaved, setRequestSaved] = useStorage('requestSaved', '');
  const [isShortFilmsSaved, setIsShortFilmsSaved] = useStorage(
    'isShortFilmsSaved',
    false
  );
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    Promise.all([mainApi.getSavedMovies()])
      .then(([moviesData]) => {
        setSavedMovies(moviesData);
        setSavedMoviesList(moviesData);
      })
      .catch((err) => {
        setErrorText(err.message || err);
      });

    filterMovies();
  }, []);

  useEffect(() => {
    filterMovies();
  }, [requestSaved, isShortFilmsSaved]);

  function filterMovies() {
    if (requestSaved || requestSaved !== '' || requestSaved !== undefined) {
      const filteredMovies = savedMovies.filter((movie) =>
        searchMovies(movie, requestSaved, isShortFilmsSaved)
      );
      setSavedMoviesList(filteredMovies);
    }
  }

  const handleChangeRequest = (value) => {
    setRequestSaved(value);
  };

  const handleChangeShortFilms = (value) => {
    setIsShortFilmsSaved(value);
  };

  const handleDeleteMovie = (movieID) => {
    setSavedMoviesList((state) =>
      state.filter((movie) => movie.movieId !== movieID)
    );
  };

  return (
    <section className='saved-movies'>
      <SearchForm
        onClick={handleChangeRequest}
        onChangeCheckbox={handleChangeShortFilms}
        screen={'saved-movies'}
      />
      {errorText ? (
        <div className='movies__error'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </div>
      ) : savedMoviesList.length === 0 ? (
        <div className='saved-movies__error'>Нет сохраненных фильмов</div>
      ) : (
        <MoviesCardList
          movies={savedMoviesList}
          windowSize={windowSize}
          screen={'saved-movies'}
          savedMovies={savedMovies}
          onDeleteMovie={handleDeleteMovie}
        />
      )}
    </section>
  );
}

export default SavedMovies;
