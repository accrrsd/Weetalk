import React, { useEffect, useRef, useState } from 'react';
import CardWrapper from '../../components/card-wrapper/card-wrapper';
import style from '../../components/card-wrapper/card-wrapper.module.css';
import Card from '../../components/card/card';
import { TipModal } from '../../components/tip-modal/tip-modal';
import { TTipPopupOffset } from '../../utils/types';
import favoritesStyle from './favorites.module.css';
import { TitleSmart } from '../../components/title-smart/title-smart';
import { getUserFavorites } from '../../utils/api';

function Favorites() {
  const [heartCords, setHeartCords] = useState<TTipPopupOffset | null>(null);
  const [favorites, setFavorites] = useState([]);
  const [isFavoritesLoaded, setIsFavoritesLoaded] = useState(false);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardWrapper = cardWrapperRef?.current;
    if (cardWrapper) {
      const likeButton = cardWrapper.querySelector('button');
      if (likeButton) {
        const { top, left } = likeButton.getBoundingClientRect();
        setHeartCords({ top, left });
      }
    }
  }, [isFavoritesLoaded, favorites, cardWrapperRef]);

  useEffect(() => {
    getUserFavorites(String(localStorage.getItem('ownerId')))
      .then(card => {
        setFavorites(card);
      })
      .catch(error => console.log(`Error: ${error}`))
      .finally(() => setIsFavoritesLoaded(true));
  }, []);

  const tipMessage =
    'Иван, ты пока ещё никого не добавил в избранное 😔 \n Это легко сделать, нажав на иконку';

  return isFavoritesLoaded && favorites.length === 0 ? (
    <div className={style.wrapper}>
      <TitleSmart
        text="Избранное"
        haveButton={true}
        buttonStyle={style.button + ' ' + style.buttonOneColumn}
        textStyle={style.title}
        wrapperStyle={style.heading}
      />
      <div style={{ height: '100px' }}></div>
      <div className={style.cardWrapper} ref={cardWrapperRef}>
        <Card
          username="Евгений Александров"
          actualJob="Дизайнер в Gradient"
          image={''}
          isLiked={false}
          description="Профессиональный дизайнер, опыт работы 8 лет. Основатель комьюнити “Контраст”. Занимаюсь йогой, люблю отдыхать на природе. Буду рад обменяться опытом построения сообщества!"
          card={{}}
          onCardClick={() => {}}
        />
      </div>
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
    <CardWrapper
      title="Избранное"
      array={favorites}
      favorites={favorites}
      setFavorites={setFavorites}
      isFavoritesLoaded={isFavoritesLoaded}
    />
  );
}

export default Favorites;
