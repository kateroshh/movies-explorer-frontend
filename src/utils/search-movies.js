const searchMovies = (movie, request, isShortFilms) => {
  const filterNameRU = movie.nameRU
    .toLowerCase()
    .includes(request.toLowerCase());
  const filterNameEN = movie.nameEN
    .toLowerCase()
    .includes(request.toLowerCase());
  const filterShortFilms = isShortFilms
    ? movie.duration <= 40
    : movie.duration > 0;
  return (filterNameEN || filterNameRU) && filterShortFilms;
};

export default searchMovies;
