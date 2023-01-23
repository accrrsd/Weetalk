import style from '../card/card.module.css';
import { useEffect, useState } from 'react';
import favImage from '../../images/favImage.png';

function Card({
  username,
  description,
  image,
  isLiked,
  columns,
  actualJob,
  card,
  onCardClick,
  isPopup,
  onClose,
  onCardLike,
}: {
  username: string;
  description: string;
  image: string;
  isLiked: boolean;
  columns?: number;
  actualJob: string;
  card: any;
  onCardClick: (e: object) => void;
  isPopup?: boolean;
  onClose?: () => void;
  onCardLike?: (
    currentUserId: number | null,
    likedUserId: number | null,
    isLiked: boolean,
    card: any
  ) => void;
}) {
  const [basicImage, setBasicImage] = useState('');
  useEffect(() => {
    if (!image) {
      setBasicImage(favImage);
    } else {
      setBasicImage(`http://weetalk.online/img/${image}`);
    }
  }, [image]);

  const handleClick = () => {
    onCardClick(card);
  };
  const handleLike = () => {
    onCardLike?.(ownerId, card.id, card.isLiked, card);
  };
  const ownerId = Number(localStorage.getItem('ownerId'));
  return (
    <>
      {columns === 2 ? (
        <div className={style.card}>
          <button
            className={
              isLiked ? style.heart + ' ' + style.heartLiked : style.heart
            }
            onClick={handleLike}
          ></button>
          <img
            className={style.cardPhoto}
            src={basicImage}
            alt={username}
            onClick={handleClick}
          />
          <div className={style.cardInfo}>
            <h2 className={style.cardTitle}>{username}</h2>
            <p className={style.cardAbout}>{actualJob}</p>
          </div>
        </div>
      ) : (
        <div
          className={
            isPopup ? style.cardRow + ' ' + style.cardRowPopup : style.cardRow
          }
        >
          {isPopup && (
            <button className={style.closeBtn} onClick={onClose}></button>
          )}
          <picture className={style.cardRowPicture}>
            <img
              className={style.cardPhotoRow}
              src={basicImage}
              alt={username}
            />
            <button
              className={
                isLiked ? style.heart + ' ' + style.heartLiked : style.heart
              }
              onClick={() => {
                onCardLike?.(ownerId, card.id, card.isLiked, card);
              }}
            ></button>
          </picture>
          <div className={style.cardInfoRow}>
            <div className={style.rowHeading}>
              <h2 className={style.cardTitleRow}>{username}</h2>
              <div className={style.cardDotRow}></div>
              <p className={style.cardAboutRow}>{actualJob}</p>
            </div>
            <div className={style.text}>{description}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
