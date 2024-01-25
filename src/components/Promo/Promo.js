import './Promo.css';
import promoImg from '../../images/promo.svg';

function Promo() {
  return (
    <section className='promo'>
      <img className='promo__img' src={promoImg} alt='Земля из букв' />
      <h1 className='promo__title'>
        Учебный проект студента факультета Веб&#8209;разработки.
      </h1>
      <p className='promo__text'>
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
      <a className='promo__link' href='#aboutProject'>
        Узнать больше
      </a>
    </section>
  );
}

export default Promo;
