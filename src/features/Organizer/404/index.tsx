import { useNavigate } from 'react-router-dom'
import { SubmitButton } from '../../../components/buttons/SubmitButton/SubmitButton'
import style from './404.module.css'

const OrganizerPage404 = () => {
  const navigate = useNavigate()
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <h2 className={style.title}>Упс.. Ошибка 404</h2>
        <p className={style.text}>Такой страницы не найдено. Ты можешь вернуться на главный экран и продолжить работу</p>
        <SubmitButton onClick={() => navigate('/organizer/')}>Вернутся на главную</SubmitButton>
      </div>
    </div>
  )
}

export default OrganizerPage404
