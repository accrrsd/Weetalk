import React, { useEffect, useRef, useState } from 'react'
import CardWrapper from '../../../components/card-wrapper/card-wrapper'
import wrapperStyle from '../../../components/card-wrapper/card-wrapper.module.css'
import style from './favorites.module.css'
import Card from '../../../components/card/card'
import { TitleSmart } from '../../../components/title-smart/title-smart'
import { getUserFavorites } from '../../../utils/api'
import favImg from '../../../images/Application/heartLiked.svg'
import { loadImages } from '../../../utils/functions'
import { ICard } from '../../../utils/interfaces'

function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [isFavoritesLoaded, setIsFavoritesLoaded] = useState(false)
  const cardWrapperRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)
  const emptyCard: ICard = {
    id: null,
    username: 'Никита',
    actualJob: 'ивент-менеджер',
    isLiked: true,
    imageName: 'local',
  }

  useEffect(() => {
    getUserFavorites()
      .then(card => setFavorites(card))
      .catch(error => console.log(`Error: ${error}`))
  }, [])

  useEffect(() => {
    // Избавляемся от первого рендера
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    Promise.all(favorites.map(image => loadImages(image)))
      .then(() => setIsFavoritesLoaded(true))
      .catch(err => console.log('Failed to load images', err))
  }, [favorites])

  return isFavoritesLoaded && favorites.length === 0 ? (
    <div className={wrapperStyle.wrapper}>
      <TitleSmart
        text="Избранное"
        haveButton={true}
        buttonStyle={wrapperStyle.button + ' ' + wrapperStyle.buttonOneColumn}
        textStyle={wrapperStyle.title}
        wrapperStyle={wrapperStyle.heading}
      />
      <div className={wrapperStyle.cardWrapper} ref={cardWrapperRef}>
        <Card card={emptyCard} />
        <div className={style.tip}>
          Ты пока ещё никого не добавил в избранное 😔 <br />
          Это легко сделать, нажав на иконку{' '}
          <img className={style.img} src={favImg} alt="Лайк" />
        </div>
      </div>
    </div>
  ) : (
    <CardWrapper
      title="Избранное"
      array={favorites}
      favorites={favorites}
      setFavorites={setFavorites}
      isFavoritesLoaded={isFavoritesLoaded}
    />
  )
}

export default Favorites
