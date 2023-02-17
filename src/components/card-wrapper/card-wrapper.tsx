import style from './card-wrapper.module.css'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useState } from 'react'
import Card from '../../components/card/card'
import { TitleSmart } from '../title-smart/title-smart'
import { Oval } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { changeLikeStatus } from '../../utils/functions'
import { ICard } from '../../utils/interfaces'

export default function CardWrapper({
  array,
  title,
  users,
  favorites,
  setUsers,
  setFavorites,
  isUsersLoaded,
  isFavoritesLoaded,
}: {
  array: ICard[]
  title: string
  users?: ICard[]
  favorites?: ICard[]
  setUsers?: Function
  setFavorites?: Function
  isUsersLoaded?: boolean
  isFavoritesLoaded?: boolean
}) {
  const [columns, setColumns] = useState(2)
  const navigate = useNavigate()

  const handleButtonClick = () => {
    if (columns === 2) {
      setColumns(1)
    } else {
      setColumns(2)
    }
  }
  const handleCardClick = (id: number | null) => {
    navigate(`/users/${id}`)
  }

  const handleLike = (
    likedUserId: number | null,
    isLiked: boolean,
    card: ICard
  ) => {
    changeLikeStatus(likedUserId, isLiked).then(() => {
      if (users !== undefined) {
        card.isLiked = !card.isLiked
        setUsers?.((state: ICard[]) =>
          state.map(c => (c.id === card.id ? card : c))
        )
      }
      if (favorites !== undefined) {
        card.isLiked = !card.isLiked
        setFavorites?.((state: ICard[]) => state.filter(c => c.isLiked))
      }
    })
  }
  return (
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
      {!isUsersLoaded && !isFavoritesLoaded ? (
        <Oval
          height={60}
          width={60}
          color="#7e7ee7"
          wrapperStyle={{}}
          wrapperClass={style.loader}
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#d9d9f8"
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
      ) : (
        <Masonry columnsCount={columns} gutter={'16px'}>
          {array.map((card: ICard) => (
            <Card
              columns={columns}
              key={card.id}
              onCardClick={handleCardClick}
              onCardLike={handleLike}
              card={card}
            />
          ))}
        </Masonry>
      )}
    </div>
  )
}
