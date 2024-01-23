import './Movies.css';
import cards from '../../utils/data.json';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies() {
  return (
    <div className='movies'>
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList cards={cards} screen={'movies'} />
    </div>
  );
}

export default Movies;
