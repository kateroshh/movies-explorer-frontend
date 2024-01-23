import './AboutProject.css';

function AboutProject() {
  return (
    <div className='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <ul className='stages'>
        <li className='stage-item'>
          <h3 className='stage-item__title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='stage-item__text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className='stage-item'>
          <h3 className='stage-item__title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='stage-item__text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className='scale'>
        <li className='scale-item'>
          <p className='scale-block scale-item_width_little scale-item_color_green'>
            1 неделя
          </p>
          <p className='scale-block scale-item_width_big scale-item_color_grey'>
            4 недели
          </p>
        </li>
        <li className='scale-item'>
          <p className='scale-block scale-item__text scale-item_width_little'>
            Back-end
          </p>
          <p className='scale-block scale-item__text scale-item_width_big'>
            Front-end
          </p>
        </li>
      </ul>
    </div>
  );
}

export default AboutProject;
