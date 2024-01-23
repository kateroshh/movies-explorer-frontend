import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <label className='filter-checkbox'>
      Короткометражки
      <input className='filter-checkbox__input' type='checkbox' />
      <span className='filter-checkbox__checkmark'></span>
    </label>
  );
}

export default FilterCheckbox;
