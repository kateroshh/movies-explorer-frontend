import './MoviesCardList.css';
import { useEffect, useState } from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';
import * as render from '../../utils/constants';

function findEndPage(windowWidth) {
  if (
    windowWidth >= render.LARGE_WINDOW_POINT ||
    (windowWidth < render.LARGE_WINDOW_POINT &&
      windowWidth > render.AVERAGE_WINDOW_POINT_FROM)
  ) {
    return render.START_NUMBER_OF_CARDS_LARGE;
  } else if (
    windowWidth <= render.AVERAGE_WINDOW_POINT_FROM &&
    windowWidth >= render.AVERAGE_WINDOW_POINT_UNTIL
  ) {
    return render.START_NUMBER_OF_CARDS_AVERAGE;
  } else if (
    windowWidth < render.SMALL_WINDOW_POINT_FROM &&
    windowWidth >= render.SMALL_WINDOW_POINT_UNTIL
  ) {
    return render.START_NUMBER_OF_CARDS_SMALL;
  }
}

function findStep(windowWidth) {
  if (
    windowWidth >= render.LARGE_WINDOW_POINT ||
    (windowWidth < render.LARGE_WINDOW_POINT &&
      windowWidth > render.AVERAGE_WINDOW_POINT_FROM)
  ) {
    return render.ADD_NUMBER_OF_CARDS_LARGE;
  } else if (
    windowWidth < render.AVERAGE_WINDOW_POINT_FROM &&
    windowWidth >= render.AVERAGE_WINDOW_POINT_UNTIL
  ) {
    return render.ADD_NUMBER_OF_CARDS_AVERAGE;
  } else if (
    windowWidth < render.SMALL_WINDOW_POINT_FROM &&
    windowWidth >= render.SMALL_WINDOW_POINT_UNTIL
  ) {
    return render.ADD_NUMBER_OF_CARDS_SMALL;
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
  }, [isResize, movies]);

  useEffect(() => {
    if (screen === 'saved-movies') {
      setIsCheckData(true);
    } else {
      return movies.length <= endPage
        ? setIsCheckData(true)
        : setIsCheckData(false);
    }
  }, [endPage, movies]);

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
          {isCheckData
            ? movies.map((item) => (
                <MoviesCard
                  key={screen === 'saved-movies' ? item._id : item.id}
                  card={item}
                  screen={screen}
                  savedMovies={savedMovies}
                  onDeleteMovie={onDeleteMovie}
                />
              ))
            : movies
                .slice(0, endPage)
                .map((item) => (
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
