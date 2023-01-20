import React from 'react';
import style from '../card/card.module.css';

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
  card: object;
  onCardClick: (e: object) => void;
  isPopup?: boolean;
  onClose?: () => void;
  onCardLike?: (ownerId: number, userId: number) => void;
}) {
  const handleClick = () => {
    onCardClick(card);
  };
  /*  const handleLike = (ownerId: any, userId: any) => {
    return fetch(
      `http://95-163-235-246.cloudvps.regruhosting.ru:8080/likes/create`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ownerId,
          userId,
        }),
      },
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };
  */
  const ownerId = Number(localStorage.getItem('ownerId'));

  return (
    <>
      {columns === 2 ? (
        <div className={style.card}>
          <button
            className={
              isLiked ? style.heart + ' ' + style.heartLiked : style.heart
            }
            onClick={() => {
              // @ts-ignore
              onCardLike(ownerId, card.id);

              /*handleLike(ownerId, card.id);*/
            }}
          ></button>
          <img
            className={style.cardPhoto}
            src={`data:image/jpeg;base64,${image}`}
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
              src={`data:image/jpeg;base64,${image}`}
              alt={username}
            />
            <button
              className={
                isLiked ? style.heart + ' ' + style.heartLiked : style.heart
              }
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
