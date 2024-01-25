import './SavedMovies.css';
import cards from '../../utils/data.json';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
  const cardsSaved = cards.filter((item) => {
    return item.saved === true;
  });

  return (
    <section className='saved-movies'>
      <SearchForm />
      <MoviesCardList cards={cardsSaved} screen={'saved-movies'} />
    </section>
  );
}

export default SavedMovies;
