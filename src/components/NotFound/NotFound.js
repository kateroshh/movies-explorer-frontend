import './NotFound.css';
import { Link, useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  const goBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className='not-found'>
      <div className='not-found__content'>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__text'>Страница не найдена</p>
      </div>
      <Link className='not-found__link' to={'..'} onClick={goBack}>
        Назад
      </Link>
    </div>
  );
}

export default NotFound;
