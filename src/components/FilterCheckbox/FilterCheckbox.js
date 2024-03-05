import './FilterCheckbox.css';
import { useState } from 'react';
import { CHKBOX_SHORT_FILMS } from '../../utils/constants';

function FilterCheckbox({ onChangeCheckbox, screen, isBlock }) {
  const [chkbox, setChkbox] = useState(() => {
    if (screen === 'saved-movies') {
      return false;
    } else {
      return JSON.parse(localStorage.getItem(CHKBOX_SHORT_FILMS));
    }
  });

  function handleChangeCheckbox(e) {
    if (screen === 'saved-movies') {
      setChkbox(e.target.checked);
      onChangeCheckbox(e.target.checked);
    } else {
      setChkbox(e.target.checked);
      localStorage.setItem(
        CHKBOX_SHORT_FILMS,
        JSON.stringify(e.target.checked)
      );
      onChangeCheckbox(e.target.checked);
    }
  }

  return (
    <label className='filter-checkbox'>
      Короткометражки
      <input
        className='filter-checkbox__input'
        type='checkbox'
        checked={chkbox}
        onChange={handleChangeCheckbox}
        disabled={isBlock}
      />
      <span className='filter-checkbox__checkmark'></span>
    </label>
  );
}

export default FilterCheckbox;
