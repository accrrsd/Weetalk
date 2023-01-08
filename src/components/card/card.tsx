import React from 'react';
import style from '../card/card.module.css';

function Card({
  title,
  about,
  photo,
  isLiked,
  columns,
  text,
  card,
  onCardClick,
  isPopup,
  onClose,
}: {
  title: string;
  about: string;
  photo: string;
  isLiked: boolean;
  columns?: number;
  text: string;
  card: object;
  onCardClick: (e: object) => void;
  isPopup?: boolean;
  onClose?: () => void;
}) {
  const handleClick = () => {
    onCardClick(card);
  };
  return (
    <>
      {columns === 2 ? (
        <div className={style.card}>
          <button
            className={
              isLiked ? style.heart + ' ' + style.heartLiked : style.heart
            }
          ></button>
          <img
            className={style.cardPhoto}
            src={photo}
            alt={title}
            onClick={handleClick}
          />
          <div className={style.cardInfo}>
            <h2 className={style.cardTitle}>{title}</h2>
            <p className={style.cardAbout}>{about}</p>
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
            <img className={style.cardPhotoRow} src={photo} alt={title} />
            <button
              className={
                isLiked ? style.heart + ' ' + style.heartLiked : style.heart
              }
            ></button>
          </picture>
          <div className={style.cardInfoRow}>
            <div className={style.rowHeading}>
              <h2 className={style.cardTitleRow}>{title}</h2>
              <div className={style.cardDotRow}></div>
              <p className={style.cardAboutRow}>{about}</p>
            </div>
            <div className={style.text}>{text}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
