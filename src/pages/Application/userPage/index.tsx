import React, { useEffect, useState } from 'react'
import style from './userPage.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { TitleSmart } from '../../../components/title-smart/title-smart'
import { getUserById } from '../../../utils/api'
import Card from '../../../components/card/card'
import { Oval } from 'react-loader-spinner'
import { changeLikeStatus } from '../../../utils/functions'
import { ILoadedCard } from '../../../utils/interfaces'

export default function UserPage() {
  const [loadedCard, setLoadedCard] = useState<ILoadedCard>({
    imageName: '',
    username: '',
    isLiked: false,
    actualJob: '',
    description: '',
    id: null,
    contacts: null,
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
  const handleLike = () => {
    changeLikeStatus(loadedCard.id, loadedCard.isLiked).then(() => {
      setLoadedCard(state => {
        return { ...state, isLiked: !state.isLiked }
      })
    })
  }
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
            onCardLike={handleLike}
            isFull={true}
            {...loadedCard}
          />
          {loadedCard.contacts && (
            <>
              <h3 className={style.subtitle}>Контакты</h3>
              {loadedCard.contacts.email && (
                <div className={style.contacts}>
                  <div className={style.email}></div>
                  <a
                    href={`mailto:${loadedCard.contacts.email}?body=Отправлено через сервис Weetalk`}
                    className={style.link}
                  >
                    {loadedCard.contacts.email}
                  </a>
                </div>
              )}
              {loadedCard.contacts.telegram && (
                <div className={style.contacts}>
                  <div className={style.tg}></div>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={`https://t.me/${loadedCard.contacts.telegram}`}
                    className={style.link}
                  >
                    @{loadedCard.contacts.telegram}
                  </a>
                </div>
              )}
            </>
          )}
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
