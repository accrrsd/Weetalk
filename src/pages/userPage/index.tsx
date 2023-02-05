import React, { useEffect, useState } from 'react'
import style from './userPage.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { TitleSmart } from '../../components/title-smart/title-smart'
import { getUserById } from '../../utils/api'
import { loadedCard } from '../../utils/types'
import Card from '../../components/card/card'
import { Oval } from 'react-loader-spinner'

export default function UserPage() {
  const [loadedCard, setLoadedCard] = useState<loadedCard>({
    image: '',
    username: '',
    isLiked: false,
    actualJob: '',
    description: '',
  })
  const [pageLoaded, setPageLoaded] = useState(false)
  const navigate = useNavigate()
  const params = useParams()
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)
    getUserById(String(params.id))
      .then(card => {
        setLoadedCard(card)
      })
      .catch(error => console.log(`Error: ${error}`))
      .finally(() => {
        setPageLoaded(true)
      })
  }, [params.id])
  const handleLike = () => {}
  return (
    <div className={style.wrapper}>
      <TitleSmart
        wrapperStyle={style.title}
        buttonStyle={style.button}
        onButtonClick={() => navigate(-1)}
      />
      {pageLoaded ? (
        <>
          <Card
            card={loadedCard}
            image={loadedCard.image}
            isLiked={loadedCard.isLiked}
            onCardLike={handleLike}
            username={loadedCard.username}
            actualJob={loadedCard.actualJob}
            isFull={true}
          />
          <h3 className={style.subtitle}>Обо мне</h3>
          <p className={style.text}>{loadedCard.description}</p>
        </>
      ) : (
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
      )}
    </div>
  )
}
