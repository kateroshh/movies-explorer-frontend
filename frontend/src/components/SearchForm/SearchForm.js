import './SearchForm.css';
import { useLocalStorageState as useStorage } from '../../utils/hooks';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ onClick, onChangeCheckbox }) {
  const [movie, setMovie] = useStorage('request', '');

  function handleChangeMovie(e) {
    setMovie(e.target.value);
  }

  const handleClick = (e) => {
    e.preventDefault();
    onClick(movie);
  };

  const handleKeyDown = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      onClick(movie);
    }
  };

  return (
    <div className='search'>
      <form className='search-form' onKeyDown={handleKeyDown}>
        <fieldset className='search-movie'>
          <input
            className='search-movie__input'
            type='text'
            value={movie || ''}
            placeholder='Введите навание фильма'
            required
            onChange={handleChangeMovie}
          />
          <button
            className='search-movie__btn'
            type='button'
            onClick={handleClick}
            disabled={movie !== '' ? false : true}
          />
        </fieldset>
        <FilterCheckbox onChangeCheckbox={onChangeCheckbox} />
      </form>
    </div>
  );
}

export default SearchForm;
