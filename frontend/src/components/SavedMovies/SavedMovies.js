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
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    filterMovies();

    Promise.all([mainApi.getSavedMovies()])
      .then(([moviesData]) => {
        setSavedMovies(moviesData);
      })
      .catch((err) => {
        setErrorText(err.message || err);
      });
  }, []);

  useEffect(() => {
    filterMovies();
  }, [requestSaved, isShortFilmsSaved]);

  function filterMovies() {
    if (requestSaved || requestSaved !== '' || requestSaved !== undefined) {
      const filteredMovies = savedMovies.filter((movie) =>
        searchMovies(movie, requestSaved, isShortFilmsSaved)
      );
      setSavedMovies(filteredMovies);
    }
  }

  const handleChangeRequest = (value) => {
    setRequestSaved(value);
  };

  const handleChangeShortFilms = (value) => {
    setIsShortFilmsSaved(value);
  };

  function handleMovieDelete(movieID) {
    mainApi
      .deleteMovie(movieID)
      .then(() => {
        setSavedMovies((state) => state.filter((card) => card._id !== movieID));
      })
      .catch((err) => {
        console.log('Ошибка получения новых данных setCards', err);
      });
  }

  return (
    <section className='saved-movies'>
      <SearchForm
        onClick={handleChangeRequest}
        onChangeCheckbox={handleChangeShortFilms}
        screen={'saved-movies'}
      />
      {savedMovies.length === 0 ? (
        <div className='saved-movies__error'>Нет сохраненных фильмов</div>
      ) : (
        <MoviesCardList
          movies={savedMovies}
          windowSize={windowSize}
          screen={'saved-movies'}
          onMovieDelete={handleMovieDelete}
        />
      )}
    </section>
  );
}

export default SavedMovies;
