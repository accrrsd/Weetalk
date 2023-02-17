import CardWrapper from '../../components/card-wrapper/card-wrapper'
import { useEffect, useRef, useState } from 'react'
import { getAllUsers } from '../../utils/api'
import { loadImages } from '../../utils/functions'
import { useAppSelector } from '../../hooks/storeHooks'

export default function Guests() {
  const [cards, setCards] = useState([])
  const [isUsersLoaded, setIsUsersLoaded] = useState(false)
  const isFirstRender = useRef(true)
  const roomId = useAppSelector((state) => state.roomReducer.room)

  useEffect(() => {
    if (roomId) {
      getAllUsers(roomId)
        .then((res) => {
          setCards(res.usersIn)
        })
        .catch((error) => console.log(`Error: ${error}`))
    }
  }, [roomId])

  useEffect(() => {
    // Избавляемся от первого рендера
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    Promise.all(cards.map((card) => loadImages(card)))
      .then(() => setIsUsersLoaded(true))
      .catch((err) => console.log('Failed to load data', err))
  }, [cards])

  return <CardWrapper array={cards} setUsers={setCards} title={'Люди рядом'} users={cards} isUsersLoaded={isUsersLoaded} />
}
