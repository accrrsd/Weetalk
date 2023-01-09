import React from 'react';
import CardWrapper from '../../components/card-wrapper/card-wrapper';
import photo from '../../images/test-photo-1.png';
import photo2 from '../../images/test-photo-2.png';
import emptyPhoto from '../../images/fav-test.png';
import style from '../../components/card-wrapper/card-wrapper.module.css';
import Card from '../../components/card/card';
function Favorites() {
  const cards: any = [
    /*    {
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
      title: 'Анна Макарова',
      about: 'Менеджер',
      photo: photo2,
      isLiked: true,
      text: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo invento perspiciatis unde omnis iste ',
    },
    {
      title: 'Иван Ковалев',
      about: 'Backend-Developer',
      photo,
      isLiked: true,
      text: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo invento perspiciatis unde omnis iste ',
    },*/
  ];
  return cards.length === 0 ? (
    <div className={style.wrapper}>
      <div className={style.heading}>
        <h1 className={style.title}>Избранное</h1>
        <button className={style.button + ' ' + style.buttonOneColumn}></button>
      </div>
      <Card
        title="Евгений Александров"
        about="Дизайнер в Gradient"
        photo={emptyPhoto}
        isLiked={false}
        text="Профессиональный дизайнер, опыт работы 8 лет. Основатель комьюнити “Контраст”. Занимаюсь йогой, люблю отдыхать на природе. Буду рад обменяться опытом построения сообщества!"
        card={{}}
        onCardClick={() => {}}
      />
    </div>
  ) : (
    <CardWrapper title="Избранное" array={cards} />
  );
}

export default Favorites;
