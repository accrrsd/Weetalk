import style from './card-wrapper.module.css';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import React, { useEffect, useState } from 'react';
import Card from '../../components/card/card';
import CardModal from '../../components/card-modal/card-modal';
import { TitleSmart } from '../title-smart/title-smart';
import { addUserLike, removeUserLike } from '../../utils/api';

export default function CardWrapper({
  array,
  title,
  users,
  favorites,
}: {
  array: any;
  title: string;
  users?: any;
  favorites?: any;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columns, setColumns] = useState(2);
  const [selectedCard, setSelectedCard] = useState({});
  const handleButtonClick = () => {
    if (columns === 2) {
      setColumns(1);
    } else {
      setColumns(2);
    }
  };
  const handleCardClick = (card: object) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };
  const handleClosePopup = () => {
    setIsModalOpen(false);
  };

  const handleLike = (
    currentUserId: number | null,
    likedUserId: number | null,
    isLiked: boolean,
  ) => {
    return addUserLike(currentUserId, likedUserId);
    /*    if (isLiked) {
      return addUserLike(currentUserId, likedUserId);
    } else {
      return removeUserLike(currentUserId, likedUserId);
    }*/
  };
  useEffect(() => {
    function closeByClickOutside(evt: any) {
      if (evt.target.classList[0].split('__')[0] === 'card-modal_popup') {
        setIsModalOpen(false);
      }
    }
    if (isModalOpen) {
      document.addEventListener('mousedown', closeByClickOutside);
      return () => {
        document.removeEventListener('mousedown', closeByClickOutside);
      };
    }
  }, [isModalOpen]);
  return (
    <>
      <div className={style.wrapper}>
        <TitleSmart
          text={title}
          haveButton={true}
          buttonStyle={
            columns === 2
              ? style.button
              : style.button + ' ' + style.buttonOneColumn
          }
          textStyle={style.title}
          wrapperStyle={style.heading}
          onButtonClick={handleButtonClick}
        />
        <Masonry columnsCount={columns} gutter={'16px'}>
          {array.map((el: any) => (
            <Card
              username={el.username}
              description={el.description}
              image={el.image}
              isLiked={el.isLiked}
              columns={columns}
              actualJob={el.actualJob}
              card={el}
              key={Math.random() * 100}
              onCardClick={handleCardClick}
              onCardLike={handleLike}
            />
          ))}
        </Masonry>
        {isModalOpen && (
          <CardModal card={selectedCard} onClose={handleClosePopup} />
        )}
      </div>
    </>
  );
}
