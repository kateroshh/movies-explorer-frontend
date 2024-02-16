import './MoviesCard.css';
import formatTime from '../../utils/formatTime';
import { useEffect, useState } from 'react';
import mainApi from '../../utils/MainApi';

function MoviesCard({ card, screen, savedMovies }) {
  console.log(savedMovies);
  const [savedMovieStyle, setSavedMovieStyle] = useState('');
  const [urlImageText, setUrlImageText] = useState('');
  const [isMovieSaved, setIsMovieSaved] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (savedMovies) {
      setIsMovieSaved(savedMovies.some((item) => card.id === item.movieId));
    }
  }, []);

  useEffect(() => {
    if (screen === 'movies') {
      setSavedMovieStyle(isMovieSaved ? 'card-save_active' : '');
      console.log(isMovieSaved);
      setUrlImageText('https://api.nomoreparties.co' + card.image.url);
    } else if (screen === 'saved-movies') {
      setSavedMovieStyle('card-save_delete');
      setUrlImageText(card.image);
    }
  }, [isMovieSaved]);

  useEffect(() => {
    if (savedMovies) {
      setIsMovieSaved(
        savedMovies.some((item) => (card.id || card.movieId) === item.movieId)
        // savedMovies.find(
        //   (savedMovie) => savedMovie.movieId === (card.id || card.movieId)
        // )
      );
    }
  }, [card.id, card.movieId, savedMovies]);

  function handleMovieLike(movie) {
    mainApi
      .saveMovie(movie)
      .then((newMovie) => {
        // setListMovies((state) =>
        //   state.map((c) => (c.id === newMovie.id ? (c.saved = true) : c))
        // );

        setIsMovieSaved(true);
        console.log('Лайк');
        console.log(newMovie);
      })
      .catch((err) => {
        console.log('Ошибка получения новых данных setCards', err);
      });
  }

  function handleMovieDelete(movieID) {
    console.log(movieID);
    mainApi
      .deleteMovie(movieID)
      .then(() => {
        // setListMovies((state) => state.filter((card) => card._id !== movieID));
        savedMovies.filter((card) => card._id !== movieID);
        setIsMovieSaved(false);
        console.log('Удалили');
        console.log(movieID);
      })
      .catch((err) => {
        console.log('Ошибка получения новых данных setCards', err);
      });
  }

  // const buttonClassName =
  // (isMovieSaved && "card__favorite_active") ||
  // (onRouteSavedMovies && "card__favorite_delete");

  function handleClickFavorite() {
    if (isMovieSaved) {
      if (card.id) {
        const movieID = savedMovies.find(
          (savedMovie) => savedMovie.movieId === card.id
        );
        handleMovieDelete(movieID._id);
      } else {
        handleMovieDelete(card._id);
      }

      console.log(card);
    } else {
      handleMovieLike(card);
    }
  }

  return (
    <li className='card'>
      <div className='card-top'>
        <div className='card-title'>
          <h2 className='card-title__text'>{card.nameRU}</h2>
          <p className='card-title__time'>{formatTime(card.duration)}</p>
        </div>
        <button
          className={`card-save ${savedMovieStyle}`}
          onClick={
            screen === 'movies' ? handleClickFavorite : handleMovieDelete
          }
        ></button>
      </div>
      <img className='card__img' src={urlImageText} alt={card.nameRU} />
    </li>
  );
}

export default MoviesCard;
