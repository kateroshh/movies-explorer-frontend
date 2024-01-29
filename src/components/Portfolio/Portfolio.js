import './Portfolio.css';

function Portfolio() {
  return (
    <div className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio-sites'>
        <li className='portfolio-site'>
          <a
            className='portfolio-site__link'
            href='https://github.com/kateroshh/russian-travel'
            target='blank'
          >
            Статичный сайт
          </a>
        </li>
        <li className='portfolio-site'>
          <a
            className='portfolio-site__link'
            href='https://github.com/kateroshh/mesto-react'
            target='blank'
          >
            Адаптивный сайт
          </a>
        </li>
        <li className='portfolio-site'>
          <a
            className='portfolio-site__link'
            href='https://github.com/kateroshh/express-mesto-gha'
            target='blank'
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
