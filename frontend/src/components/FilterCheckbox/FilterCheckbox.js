import './FilterCheckbox.css';
import { useLocalStorageState as useStorage } from '../../utils/hooks';

function FilterCheckbox({ onChangeCheckbox, screen }) {
  const requestMovies =
    screen === 'saved-movies' ? 'isShortFilmsSaved' : 'isShortFilms';
  const [chkbox, setChkbox] = useStorage(requestMovies, false);

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
