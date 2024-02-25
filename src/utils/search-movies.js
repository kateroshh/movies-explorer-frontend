import { DURATION_OF_SHORTFILMS } from './constants';

const searchMovies = (movie, request, isShortFilms) => {
  const filterNameRU = movie.nameRU
    .toLowerCase()
    .includes(request.toLowerCase());
  const filterNameEN = movie.nameEN
    .toLowerCase()
    .includes(request.toLowerCase());
  const filterShortFilms = isShortFilms
    ? movie.duration <= DURATION_OF_SHORTFILMS
    : movie.duration > 0;
  return (filterNameEN || filterNameRU) && filterShortFilms;
};

export default searchMovies;
