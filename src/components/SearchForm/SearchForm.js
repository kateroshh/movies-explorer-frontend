import './SearchForm.css';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <div className='search'>
      <form className='search-form'>
        <fieldset className='search-movie'>
          <input className='search-movie__input' type='text' value='Фильм' />
          <button className='search-movie__btn' type='button' />
        </fieldset>
        <FilterCheckbox />
      </form>
    </div>
  );
}

export default SearchForm;
