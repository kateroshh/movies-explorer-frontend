import './MoviesCard.css';
import formatTime from '../../utils/formatTime';
import { useEffect, useState } from 'react';
import mainApi from '../../utils/MainApi';

function MoviesCard({ card, screen, savedMovies, onDeleteMovie }) {
  const [liked, setLiked] = useState();
  const [activeMovieId, setActiveMovieId] = useState('');

  useEffect(() => {
    const savedArray = savedMovies.map((movie) => movie.movieId);
    let savedId;
    savedMovies.forEach((el) => {
      if (el.movieId === card.id) {
        savedId = el._id;
      }
    });
    setLiked(savedArray.includes(card.id));
    setActiveMovieId(savedId);
  }, [card, savedMovies]);

  function handleMovie() {
    if (screen === 'saved-movies') {
      mainApi
        .deleteMovie(card._id)
        .then(() => {
          onDeleteMovie(card.movieId);
          setLiked(!liked);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (liked) {
        mainApi
          .deleteMovie(activeMovieId)
          .then(() => {
            setLiked(!liked);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        mainApi
          .saveMovie(card)
          .then((res) => {
            setActiveMovieId(res._id);
            setLiked(!liked);
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
          className={`card-save ${
            screen === 'saved-movies'
              ? 'card-save_delete'
              : liked
              ? 'card-save_active'
              : ''
          }`}
          onClick={handleMovie}
        ></button>
      </div>
      <a className='card__link' href={card.trailerLink} target='blank'>
        <img
          className='card__img'
          src={
            screen === 'movies'
              ? 'https://api.nomoreparties.co' + card.image.url
              : card.image
          }
          alt={card.nameRU}
        />
      </a>
    </li>
  );
}

export default MoviesCard;
