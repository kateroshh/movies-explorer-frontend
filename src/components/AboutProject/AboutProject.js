import './AboutProject.css';

function AboutProject() {
  return (
    <section className='about-project'>
      <h2 className='about-project__title' id='aboutProject'>
        О проекте
      </h2>
      <ul className='stages'>
        <li className='stages__item'>
          <h3 className='stages__title'>Дипломный проект включал 5 этапов</h3>
          <p className='stages__text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className='stages__item'>
          <h3 className='stages__title'>На выполнение диплома ушло 5 недель</h3>
          <p className='stages__text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className='scale'>
        <li className='scale__item'>
          <p className='scale-block scale-block_width_little scale-block_color_green'>
            1 неделя
          </p>
          <p className='scale-block scale-block_width_big scale-block_color_grey'>
            4 недели
          </p>
        </li>
        <li className='scale__item'>
          <p className='scale-block scale__text scale-block_width_little'>
            Back-end
          </p>
          <p className='scale-block scale__text scale-block_width_big'>
            Front-end
          </p>
        </li>
      </ul>
    </section>
  );
}

export default AboutProject;
