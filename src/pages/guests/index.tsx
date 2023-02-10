import CardWrapper from '../../components/card-wrapper/card-wrapper'
import { useEffect, useRef, useState } from 'react'
import { getAllUsers } from '../../utils/api'
import { loadImages } from '../../utils/functions'

export default function Guests() {
  const [cards, setCards] = useState([])
  const [isUsersLoaded, setIsUsersLoaded] = useState(false)
  const isFirstRender = useRef(true)

  useEffect(() => {
    console.log(document.cookie.split('; '))
    getAllUsers()
      .then(card => {
        setCards(card)
      })
      .catch(error => console.log(`Error: ${error}`))
  }, [])

  useEffect(() => {
    // Избавляемся от первого рендера
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    Promise.all(cards.map(card => loadImages(card)))
      .then(() => setIsUsersLoaded(true))
      .catch(err => console.log('Failed to load data', err))
  }, [cards])

  return (
    <CardWrapper
      array={cards}
      setUsers={setCards}
      title={'Люди рядом'}
      users={cards}
      isUsersLoaded={isUsersLoaded}
    />
  )
}
