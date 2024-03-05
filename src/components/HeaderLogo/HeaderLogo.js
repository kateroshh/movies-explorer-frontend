import './HeaderLogo.css';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';

function HeaderLogo() {
  return (
    // logo_page_main
    <div className='logo'>
      <Link to='/'>
        <img className='logo__img' src={logo} alt='Логотип' />
      </Link>
    </div>
  );
}

export default HeaderLogo;
