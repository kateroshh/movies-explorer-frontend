import './Movies.css';
import cards from '../../utils/data.json';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies() {
  return (
    <section className='movies'>
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList cards={cards} screen={'movies'} />
    </section>
  );
}

export default Movies;
