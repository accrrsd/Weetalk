import { useEffect } from 'react'
import { Oval } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import style from './checkRoom.module.css'

export default function CheckRoom() {
  const { roomId } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (roomId) {
      localStorage.setItem('roomId', roomId)
      navigate('/login')
    }
  }, [roomId, navigate])
  return (
    <div className={style.wrapper}>
      <Oval height={60} width={60} color="#7e7ee7" visible={true} secondaryColor="#d9d9f8" strokeWidth={4} strokeWidthSecondary={4} />
    </div>
  )
}
