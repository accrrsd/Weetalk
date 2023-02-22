import style from '../card/card.module.css'
import { useEffect, useState } from 'react'
import favImage from '../../images/Application/favImage.png'
import { ICard } from '../../utils/interfaces'

function Card({
  columns,
  card,
  onCardClick,
  onCardLike,
  isFull,
}: {
  columns?: number
  card: ICard
  onCardClick?: (e: number | null) => void
  onCardLike?: (
    likedUserId: number | null,
    isLiked: boolean,
    card: ICard
  ) => void
  isFull?: boolean
}) {
  const { id, username, isLiked, actualJob, imageName } = card
  const [basicImage, setBasicImage] = useState('')
  useEffect(() => {
    if (!imageName || imageName === 'local') {
      setBasicImage(favImage)
    } else {
      setBasicImage(`https://weetalk.online/img/${imageName}`)
    }
  }, [imageName])

  const handleClick = () => {
    onCardClick?.(id)
  }
  const handleLike = () => {
    onCardLike?.(id, isLiked, card)
  }
  return (
    <>
      {columns === 2 ? (
        <div className={style.card}>
          <img
            className={style.photo}
            src={basicImage}
            alt={username}
            onClick={handleClick}
          />
          <div className={style.info}>
            <h2 className={style.title}>{username.split(' ')[0]}</h2>
            <div className={style.aboutWrapper}>
              <p className={style.about}>{actualJob}</p>
              <div className={style.aboutFav}>
                <div className={style.aboutDivider}></div>
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
            className={style.photoRow}
            src={basicImage}
            alt={username}
            onClick={handleClick}
          />
          <div className={style.infoRow}>
            <div className={style.headingRow}>
              <h2 className={style.titleRow}>{username.split(' ')[0]}</h2>
              <p className={style.aboutRow}>{actualJob}</p>
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
                onClick={handleLike}
              ></button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Card
