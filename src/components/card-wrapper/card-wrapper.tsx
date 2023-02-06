import style from './card-wrapper.module.css'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useState } from 'react'
import Card from '../../components/card/card'
import { TitleSmart } from '../title-smart/title-smart'
import { Oval } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { changeLikeStatus } from '../../utils/functions'

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
  array: Array<any>
  title: string
  users?: any
  favorites?: any
  setUsers?: Function
  setFavorites?: Function
  isUsersLoaded?: boolean
  isFavoritesLoaded?: boolean
}) {
  const [columns, setColumns] = useState(2)
  const [selectedCard, setSelectedCard] = useState({})
  const navigate = useNavigate()

  const handleButtonClick = () => {
    if (columns === 2) {
      setColumns(1)
    } else {
      setColumns(2)
    }
  }
  const handleCardClick = (card: any) => {
    setSelectedCard(card)
    navigate(`/users/${card.id}`)
  }

  const handleLike = (
    currentUserId: number | null,
    likedUserId: number | null,
    isLiked: boolean,
    card: any
  ) => {
    changeLikeStatus(currentUserId, likedUserId, isLiked).then(() => {
      if (users !== undefined) {
        card.isLiked = !card.isLiked
        setUsers?.((state: Array<any>) =>
          state.map(c => (c.id === card.id ? card : c))
        )
      }
      if (favorites !== undefined) {
        card.isLiked = !card.isLiked
        setFavorites?.((state: Array<any>) =>
          state.filter(c => c.isLiked === true)
        )
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
          {array.map((el: any) => (
            <Card
              username={el.username}
              description={el.description}
              image={el.image}
              isLiked={el.isLiked}
              columns={columns}
              actualJob={el.actualJob}
              card={el}
              key={el.id}
              onCardClick={handleCardClick}
              onCardLike={handleLike}
            />
          ))}
        </Masonry>
      )}
    </div>
  )
}
