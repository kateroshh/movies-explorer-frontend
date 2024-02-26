import './Movies.css';
import { useEffect, useState } from 'react';
import searchMovies from '../../utils/search-movies';
import { useLocalStorageState as useStorage } from '../../utils/hooks';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ loggedIn, windowSize }) {
  const [request, setRequest] = useStorage('request', '');
  const [isShortFilms, setIsShortFilms] = useStorage('isShortFilms', false);
  const [movies, setMovies] = useStorage('movies', []);
  const [listMovies, setListMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useStorage('saved-movies', []);
  const [errorText, setErrorText] = useState('');
  const [loader, setLoader] = useState(false);
  const [isBlock, setIsBlock] = useState(false);

  useEffect(() => {
    filterMovies();
  }, [movies, request, isShortFilms]);

  function handleFindMovies(e) {
    e.preventDefault();
    if (movies.length === 0) {
      setLoader(true);
      setIsBlock(true);
      Promise.all([moviesApi.getMovies(), mainApi.getSavedMovies()])
        .then(([moviesData, savedMoviesApi]) => {
          setSavedMovies(savedMoviesApi);
          setMovies(moviesData);
        })
        .catch((err) => {
          setErrorText(
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          );
        })
        .finally(() => {
          setLoader(false);
          setIsBlock(false);
        });
    } else {
      setIsBlock(false);
    }
  }

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
    <>
      <Header loggedIn={loggedIn} />

      <section className='movies'>
        <SearchForm
          onClick={handleChangeRequest}
          onChangeCheckbox={handleChangeShortFilms}
          onSubmit={handleFindMovies}
          screen={'movies'}
          isBlock={isBlock}
          setIsBlock={setIsBlock}
        />
        {errorText ? (
          <div className='movies__error'>{errorText}</div>
        ) : request === '' || request === undefined || loader ? (
          loader && <Preloader />
        ) : !loader && listMovies.length === 0 ? (
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

      <Footer />
    </>
  );
}

export default Movies;
