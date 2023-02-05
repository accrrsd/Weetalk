import React, { useEffect, useRef, useState } from 'react'
import CardWrapper from '../../components/card-wrapper/card-wrapper'
import wrapperStyle from '../../components/card-wrapper/card-wrapper.module.css'
import style from './favorites.module.css'
import Card from '../../components/card/card'
import { TitleSmart } from '../../components/title-smart/title-smart'
import { getUserFavorites } from '../../utils/api'
import favImg from '../../images/heartLiked.svg'

function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [isFavoritesLoaded, setIsFavoritesLoaded] = useState(false)
  const cardWrapperRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    getUserFavorites(String(localStorage.getItem('ownerId')))
      .then(card => setFavorites(card))
      .catch(error => console.log(`Error: ${error}`))
  }, [])

  useEffect(() => {
    const loadImage = (card: any) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image()
        loadImg.src = `http://weetalk.online/img/${card.image}`
        loadImg.onload = () => resolve(card)
        loadImg.onerror = err => reject(err)
      })
    }
    // Избавляемся от первого рендера
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    Promise.all(favorites.map(image => loadImage(image)))
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
        <Card
          username="Никитка"
          actualJob="ивент-менеджер"
          image={''}
          isLiked={true}
          description="Профессиональный дизайнер, опыт работы 8 лет. Основатель комьюнити “Контраст”. Занимаюсь йогой, люблю отдыхать на природе. Буду рад обменяться опытом построения сообщества!"
        />
        <div className={style.tip}>
          Иван, ты пока ещё никого не добавил в избранное 😔 <br />
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
