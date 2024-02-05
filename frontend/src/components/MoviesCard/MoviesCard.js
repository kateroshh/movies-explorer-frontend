import './MoviesCard.css';
import formatTime from '../../utils/formatTime';

function MoviesCard({ card, screen }) {
  let savedMovieStyle = '';

  if (screen === 'movies') {
    savedMovieStyle = card.saved ? 'card-save_active' : '';
  } else if (screen === 'saved-movies') {
    savedMovieStyle = 'card-save_delete';
  }

  return (
    <li className='card'>
      <div className='card-top'>
        <div className='card-title'>
          <h2 className='card-title__text'>{card.nameRU}</h2>
          <p className='card-title__time'>{formatTime(card.duration)}</p>
        </div>
        <button className={`card-save ${savedMovieStyle}`}></button>
      </div>
      <img
        className='card__img'
        src={'https://api.nomoreparties.co/' + card.image.url}
        alt={card.nameRU}
      />
    </li>
  );
}

export default MoviesCard;
