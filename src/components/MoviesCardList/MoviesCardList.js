import './MoviesCardList.css';
import { useEffect, useState } from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';

function findEndPage(windowWidth) {
  if (windowWidth >= 1280) {
    return 12;
  } else if (windowWidth < 1280 && windowWidth >= 480) {
    return 12;
  } else if (windowWidth < 480 && windowWidth >= 320) {
    return 5;
  }
}

function findStep(windowWidth) {
  if (windowWidth >= 1280) {
    return 3;
  } else if (windowWidth < 1280 && windowWidth >= 480) {
    return 3;
  } else if (windowWidth < 480 && windowWidth >= 320) {
    return 2;
  }
}

function MoviesCardList({
  movies,
  windowSize,
  screen,
  savedMovies,
  onDeleteMovie,
}) {
  const windowWidth = windowSize[0];
  const isResize = windowSize[2];

  const [endPage, setEndPage] = useState(findEndPage);
  const [stepPage, setStepPage] = useState(findStep);
  const [isCheckData, setIsCheckData] = useState(false);

  useEffect(() => {
    setEndPage(findEndPage(windowWidth));
    setStepPage(findStep(windowWidth));
  }, [isResize]);

  useEffect(() => {
    return movies.length <= endPage
      ? setIsCheckData(true)
      : setIsCheckData(false);
  }, [endPage]);

  const showMore = () => {
    setEndPage((prevValue) => prevValue + stepPage);
  };

  return (
    <>
      <div
        className={`card-list-container ${
          screen === 'saved-movies' ? 'card-list-container_saved' : ''
        }`}
      >
        <ul className='card-list'>
          {movies.slice(0, endPage).map((item) => (
            <MoviesCard
              key={screen === 'saved-movies' ? item._id : item.id}
              card={item}
              screen={screen}
              savedMovies={savedMovies}
              onDeleteMovie={onDeleteMovie}
            />
          ))}
        </ul>
      </div>
      <button
        className={`more ${screen === 'saved-movies' ? 'more_hidden' : ''} ${
          isCheckData ? 'more_hidden' : ''
        }`}
        onClick={showMore}
      >
        Ещё
      </button>
    </>
  );
}

export default MoviesCardList;
