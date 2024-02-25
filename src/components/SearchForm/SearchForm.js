import './SearchForm.css';
import { useState } from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { INPUT_REQUEST_MOVIES } from '../../utils/constants';

function SearchForm({ onClick, onChangeCheckbox, onSubmit, screen }) {
  const [movie, setMovie] = useState(() => {
    if (screen === 'saved-movies') {
      return '';
    } else {
      return JSON.parse(localStorage.getItem(INPUT_REQUEST_MOVIES));
    }
  });

  function handleChangeMovie(e) {
    setMovie(e.target.value);
    localStorage.setItem(INPUT_REQUEST_MOVIES, JSON.stringify(e.target.value));
  }

  const handleClick = (e) => {
    e.preventDefault();
    onClick(movie);
    onSubmit(e);
  };

  const handleKeyDown = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      onClick(movie);
      onSubmit(e);
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
        <FilterCheckbox onChangeCheckbox={onChangeCheckbox} screen={screen} />
      </form>
    </div>
  );
}

export default SearchForm;
