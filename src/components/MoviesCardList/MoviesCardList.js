import './MoviesCardList.css';
// import cards from '../../utils/data.json';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards, screen }) {
  return (
    <>
      <div
        className={`card-list-container ${
          screen === 'saved-movies' ? 'card-list-container_saved' : ''
        }`}
      >
        <ul className='card-list'>
          {cards.map((item) => (
            <MoviesCard
              key={item.id}
              card={item}
              screen={screen}
              // onCardSaved={onCardSaved}
            />
          ))}
        </ul>
      </div>
      <button
        className={`more ${screen === 'saved-movies' ? 'more_saved' : ''}`}
      >
        Ещё
      </button>
    </>
  );
}

export default MoviesCardList;
