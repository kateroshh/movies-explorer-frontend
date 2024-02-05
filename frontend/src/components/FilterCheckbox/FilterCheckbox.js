import './FilterCheckbox.css';
import { useLocalStorageState as useStorage } from '../../utils/hooks';

function FilterCheckbox({ onChangeCheckbox }) {
  const [chkbox, setChkbox] = useStorage('isShortFilms', false);

  function handleChangeCheckbox(e) {
    setChkbox(e.target.checked);
    onChangeCheckbox(e.target.checked);
  }

  return (
    <label className='filter-checkbox'>
      Короткометражки
      <input
        className='filter-checkbox__input'
        type='checkbox'
        checked={chkbox}
        onChange={handleChangeCheckbox}
      />
      <span className='filter-checkbox__checkmark'></span>
    </label>
  );
}

export default FilterCheckbox;
