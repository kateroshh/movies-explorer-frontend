import './SavedMovies.css';
import { useEffect, useState } from 'react';
// import { useLocalStorageState as useStorage } from '../../utils/hooks';
import mainApi from '../../utils/MainApi';
import searchMovies from '../../utils/search-movies';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ loggedIn, windowSize }) {
  const [requestSaved, setRequestSaved] = useState('');
  const [isShortFilmsSaved, setIsShortFilmsSaved] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [errorText, setErrorText] = useState('');
  const [isBlock, setIsBlock] = useState(false);

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
      setIsBlock(false);
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
    <>
      <Header loggedIn={loggedIn} />

      <section className='saved-movies'>
        <SearchForm
          onClick={handleChangeRequest}
          onChangeCheckbox={handleChangeShortFilms}
          onSubmit={filterMovies}
          screen={'saved-movies'}
          isBlock={isBlock}
          setIsBlock={setIsBlock}
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

      <Footer />
    </>
  );
}

export default SavedMovies;
