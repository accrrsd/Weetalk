import styles from './RemoveModal.module.css'
import { IRemoveModalProps } from '../../../utils/interfaces'
import infoImg from '../../../images/Organizer/delete-info.svg'

export const RemoveModal = ({
  active,
  setActive,
  roomName,
}: IRemoveModalProps) => {
  return (
    <div
      className={styles.wrapper + ' ' + `${active && styles.active}`}
      onClick={() => setActive(false)}
    >
      <div
        className={styles.content + ' ' + `${active && styles.active}`}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.heading}>
          <h4 className={styles.title}>Удалить событие</h4>
          <button
            className={styles.closeButton}
            onClick={() => setActive(false)}
          />
        </div>
        <p className={styles.text}>
          Вы действительно хотите удалить событие: <br />
          {roomName}?
        </p>
        <div className={styles.tip}>
          <img src={infoImg} alt="Подсказка" />
          Вы не сможете восстановить его
        </div>
        <button className={styles.button} onClick={() => setActive(false)}>
          Удалить
        </button>
      </div>
    </div>
  )
}
