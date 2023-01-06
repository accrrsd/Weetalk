import style from './main.module.css';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import photo from '../../images/test-photo-1.png';
import photo2 from '../../images/test-photo-2.png';
import { useState } from 'react';
import Card from '../../components/card/card';

export default function Main() {
  const cards = [
    {
      title: 'Иван Ковалев',
      about: 'Backend-Developer',
      photo,
      isLiked: true,
      text: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo invento perspiciatis unde omnis iste ',
    },
    {
      title: 'Анна Макарова',
      about: 'Менеджер',
      photo: photo2,
      isLiked: true,
      text: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo invento perspiciatis unde omnis iste ',
    },
    {
      title: 'Вика Лау',
      about: 'Ивент-менеджер',
      photo,
      isLiked: false,
      text: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa"',
    },
    {
      title: 'Ирен Аси',
      about: 'Стажер-рекрутер ',
      photo: photo2,
      isLiked: false,
      text: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo invento perspiciatis unde omnis iste ',
    },
  ];
  const [columns, setColumns] = useState(2);
  const handleButtonClick = () => {
    if (columns === 2) {
      setColumns(1);
    } else {
      setColumns(2);
    }
  };
  const handleCardClick = () => {
    /* когда будем получать данные с сервера */
  };
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.heading}>
          <h1 className={style.title}>Участники мероприятия</h1>
          <button
            className={
              columns === 2
                ? style.button
                : style.button + ' ' + style.buttonOneColumn
            }
            onClick={handleButtonClick}
          ></button>
        </div>
        <Masonry columnsCount={columns} gutter={'16px'}>
          {cards.map((el) => (
            <Card
              title={el.title}
              about={el.about}
              photo={el.photo}
              isLiked={el.isLiked}
              columns={columns}
              text={el.text}
              key={Math.random() * 100}
            />
          ))}
        </Masonry>
      </div>
    </>
  );
}
