import { useEffect } from 'react'
import { Oval } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/storeHooks'
import { setRoom } from '../../store/reducers/RoomSlice'
import style from './checkRoom.module.css'

export default function CheckRoom() {
  const { roomId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (roomId) {
      dispatch(setRoom(roomId))
      navigate('/login')
    }
  }, [roomId, dispatch, navigate])
  return (
    <div className={style.wrapper}>
      <Oval height={60} width={60} color="#7e7ee7" visible={true} secondaryColor="#d9d9f8" strokeWidth={4} strokeWidthSecondary={4} />
    </div>
  )
}
