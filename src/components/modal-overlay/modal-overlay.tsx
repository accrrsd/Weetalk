import style from './modal-overlay.module.css'

export default function ModalOverlay({ onClick }: { onClick: () => void }) {
  return <div className={style.overlay} onClick={onClick}></div>
}
