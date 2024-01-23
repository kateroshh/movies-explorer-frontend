import './MoviesCard.css';
import cardImg from '../../images/cards/1.jpg';
// ${card.img}

function MoviesCard({ card, screen }) {
  let savedMovieStyle = '';

  if (screen === 'movies') {
    savedMovieStyle = card.saved ? 'card-save_active' : '';
  } else if (screen === 'saved-movies') {
    savedMovieStyle = 'card-save_delete';
  }

  return (
    <div className='card'>
      <div className='card-top'>
        <div className='card-title'>
          <h2 className='card-title__text'>{card.name}</h2>
          <p className='card-title__time'>{card.time}</p>
        </div>
        <button className={`card-save ${savedMovieStyle}`}></button>
      </div>
      <img className='card__img' src={card.img} alt={card.name} />
    </div>
  );
}

export default MoviesCard;
