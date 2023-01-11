import React, { useEffect, useState } from 'react';
import CardWrapper from '../../components/card-wrapper/card-wrapper';
import photo from '../../images/test-photo-1.png';
import photo2 from '../../images/test-photo-2.png';
import emptyPhoto from '../../images/fav-test.png';
import style from '../../components/card-wrapper/card-wrapper.module.css';
import Card from '../../components/card/card';
import { TipModal } from '../../components/tip-modal/tip-modal';
import { TTipPopupOffset } from '../../utils/types';

import favoritesStyle from './favorites.module.css';
import styles from '../advices/advices.module.css';
import { TitleSmart } from '../../components/title-smart/title-smart';

function Favorites() {
  const [heartCords, setHeartCords] = useState<TTipPopupOffset | null>(null);
  const [favorites, setFavorites] = useState([]);
  const ownerId = Number(localStorage.getItem('ownerId'));
  const getFavorites = () => {
    return fetch(
      `http://95-163-235-246.cloudvps.regruhosting.ru:8080/likes/${ownerId}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };
  useEffect(() => {
    const HeartElem = document.querySelector(
      '.card_heart__zgeMe',
    ) as HTMLButtonElement;
    if (HeartElem) {
      // const top = HeartElem.offsetTop
      // const left = HeartElem.offsetLeft
      const { top, left } = HeartElem.getBoundingClientRect();
      setHeartCords({ top, left });
    }
    getFavorites()
      .then((card) => {
        setFavorites(card);
        console.log(card);
      })
      .catch((error) => console.log(`Error: ${error}`));
  }, []);
  const tipMessage =
    'Иван, ты пока ещё никого не добавил в избранное 😔 \n Это легко сделать, нажав на иконку';

  return favorites.length === 0 ? (
    <div className={style.wrapper}>
      <TitleSmart
        text="Избранное"
        haveButton={true}
        buttonStyle={style.button + ' ' + style.buttonOneColumn}
        textStyle={style.title}
        wrapperStyle={style.heading}
      />
      <div style={{ height: '100px' }}></div>
      <Card
        name="Евгений Александров"
        about="Дизайнер в Gradient"
        photo={emptyPhoto}
        isLiked={false}
        work="Профессиональный дизайнер, опыт работы 8 лет. Основатель комьюнити “Контраст”. Занимаюсь йогой, люблю отдыхать на природе. Буду рад обменяться опытом построения сообщества!"
        card={{}}
        onCardClick={() => {}}
      />
      {heartCords && (
        <TipModal
          message={tipMessage}
          offset={heartCords}
          onClick={() => {}}
          overlayAdditionStyle={favoritesStyle.TipAdditionStyle}
        />
      )}
    </div>
  ) : (
    <CardWrapper title="Избранное" array={favorites} favorites={favorites} />
  );
}

export default Favorites;
