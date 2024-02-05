import './Movies.css';
import { useEffect, useState } from 'react';
import searchMovies from '../../utils/search-movies';
import { useLocalStorageState as useStorage } from '../../utils/hooks';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ movies, windowSize }) {
  // const [request, setRequest] = useState(
  //   JSON.parse(localStorage.getItem('request')) || ''
  // );
  // const [isShortFilms, setIsShortFilms] = useState(false);

  const [request, setRequest] = useStorage('request', '');
  const [isShortFilms, setIsShortFilms] = useStorage('isShortFilms', false);
  const [listMovies, setListMovies] = useState([]);
  // console.log('request ', request);
  // console.log('request ', isShortFilms);

  function filterMovies() {
    if (request || request !== '' || request !== undefined) {
      const filteredMovies = movies.filter((movie) =>
        searchMovies(movie, request, isShortFilms)
      );
      setListMovies(filteredMovies);
    }
  }

  useEffect(() => {
    filterMovies();
    // console.log(movies);
  }, []);

  useEffect(() => {
    filterMovies();
  }, [request, isShortFilms]);

  const handleChangeRequest = (value) => {
    setRequest(value);
  };

  const handleChangeShortFilms = (value) => {
    setIsShortFilms(value);
  };

  return (
    <section className='movies'>
      <SearchForm
        onClick={handleChangeRequest}
        onChangeCheckbox={handleChangeShortFilms}
      />
      {request === '' || request === undefined ? (
        <Preloader />
      ) : listMovies.length === 0 ? (
        <div className='movies__notfound'>Ничего не найдено</div>
      ) : (
        <MoviesCardList
          movies={listMovies}
          windowSize={windowSize}
          screen={'movies'}
        />
      )}
    </section>
  );
}

export default Movies;
