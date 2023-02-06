import style from '../card/card.module.css'
import { useEffect, useState } from 'react'
import favImage from '../../images/favImage.png'

function Card({
  username,
  description,
  image,
  isLiked,
  columns,
  actualJob,
  card,
  onCardClick,
  onCardLike,
  isFull,
}: {
  username: string
  description?: string
  image: string
  isLiked: boolean
  columns?: number
  actualJob?: string
  card?: any
  onCardClick?: (e: object) => void
  onCardLike?: (
    currentUserId: number | null,
    likedUserId: number | null,
    isLiked: boolean,
    card: any
  ) => void
  isFull?: boolean
}) {
  const [basicImage, setBasicImage] = useState('')
  useEffect(() => {
    if (!image) {
      setBasicImage(favImage)
    } else {
      setBasicImage(`http://weetalk.online/img/${image}`)
    }
  }, [image])

  const handleClick = () => {
    onCardClick?.(card)
  }
  const handleLike = () => {
    onCardLike?.(ownerId, card.id, card.isLiked, card)
  }
  const ownerId = Number(localStorage.getItem('ownerId'))
  return (
    <>
      {columns === 2 ? (
        <div className={style.card}>
          <img
            className={style.cardPhoto}
            src={basicImage}
            alt={username}
            onClick={handleClick}
          />
          <div className={style.cardInfo}>
            <h2 className={style.cardTitle}>{username.split(' ')[0]}</h2>
            <div className={style.cardAboutWrapper}>
              <p className={style.cardAbout}>{actualJob}</p>
              <div className={style.cardAboutFav}>
                <div className={style.cardAboutDivider}></div>
                <button
                  className={
                    isLiked ? style.heart + ' ' + style.heartLiked : style.heart
                  }
                  onClick={handleLike}
                ></button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={
            isFull ? style.cardRow + ' ' + style.cardFull : style.cardRow
          }
        >
          <img
            className={style.cardPhotoRow}
            src={basicImage}
            alt={username}
            onClick={handleClick}
          />
          <div className={style.cardInfoRow}>
            <div className={style.rowHeading}>
              <h2 className={style.cardTitleRow}>{username.split(' ')[0]}</h2>
              <p className={style.cardAboutRow}>{actualJob}</p>
            </div>
            <div className={style.aboutFavRow}>
              <div className={style.aboutFavRowDivider}></div>
              <button
                className={
                  isLiked
                    ? style.heart +
                      ' ' +
                      style.heartRow +
                      ' ' +
                      style.heartLiked
                    : style.heart + ' ' + style.heartRow
                }
                onClick={() => {
                  onCardLike?.(ownerId, card.id, card.isLiked, card)
                }}
              ></button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Card
