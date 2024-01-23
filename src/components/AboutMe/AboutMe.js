import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';

import photoStudent from '../../images/photo-student.jpg';

function AboutMe() {
  return (
    <div className='about'>
      <h2 className='about__title'>Студент</h2>
      <img
        className='about__img'
        src={photoStudent}
        alt='Фотография студента'
      />
      <p className='about__name'>Виталий</p>
      <p className='about__profession'>Фронтенд-разработчик, 30 лет</p>
      <p className='about__info'>
        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
        есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно
        начал кодить. С 2015 года работал в компании «СКБ Контур». После того,
        как прошёл курс по веб&#8209;разработке, начал заниматься
        фриланс&#8209;заказами и ушёл с постоянной работы.
      </p>
      <a className='about__link' href='#'>
        Github
      </a>

      <Portfolio />
    </div>
  );
}

export default AboutMe;
