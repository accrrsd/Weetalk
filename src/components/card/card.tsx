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
  onCardLike?: (likedUserId: number | null, isLiked: boolean, card: any) => void
  isFull?: boolean
}) {
  const [basicImage, setBasicImage] = useState('')
  useEffect(() => {
    if (!image) {
      setBasicImage(favImage)
    } else {
      setBasicImage(`https://weetalk.online/img/${image}`)
    }
  }, [image])

  const handleClick = () => {
    onCardClick?.(card)
  }
  const handleLike = () => {
    onCardLike?.(card.id, card.isLiked, card)
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
