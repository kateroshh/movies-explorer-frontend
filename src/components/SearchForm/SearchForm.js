import './SearchForm.css';
import { useState } from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { INPUT_REQUEST_MOVIES } from '../../utils/constants';

function SearchForm({
  onClick,
  onChangeCheckbox,
  onSubmit,
  screen,
  isBlock,
  setIsBlock,
}) {
  const [movie, setMovie] = useState(() => {
    if (screen === 'saved-movies') {
      return '';
    } else {
      return JSON.parse(localStorage.getItem(INPUT_REQUEST_MOVIES));
    }
  });

  function handleChangeMovie(e) {
    if (screen === 'saved-movies') {
      setMovie(e.target.value);
    } else {
      setMovie(e.target.value);
      localStorage.setItem(
        INPUT_REQUEST_MOVIES,
        JSON.stringify(e.target.value)
      );
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    setIsBlock(true);
    onClick(movie);
    onSubmit(e);
  };

  const handleKeyDown = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      setIsBlock(true);
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
            disabled={isBlock}
          />
          <button
            className='search-movie__btn'
            type='button'
            onClick={handleClick}
            disabled={movie !== '' && !isBlock ? false : true}
          />
        </fieldset>
        <FilterCheckbox
          onChangeCheckbox={onChangeCheckbox}
          screen={screen}
          isBlock={isBlock}
        />
      </form>
    </div>
  );
}

export default SearchForm;
