import './Footer.css';

function Footer() {
  return (
    <footer className='footer-container'>
      <div className='footer'>
        <p className='footer__text'>
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className='footer-bottom'>
          <p className='footer-bottom__year'>© 2020</p>
          <ul className='footer-sites'>
            <li className='footer-site'>
              <a
                className='footer-site__link'
                href='https://practicum.yandex.ru/'
                target='blank'
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className='footer-site'>
              <a
                className='footer-site__link'
                href='https://github.com/kateroshh'
                target='blank'
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
