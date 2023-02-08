import style from './modal-overlay.module.css'

export default function ModalOverlay({ onClick, additionStyle }: { onClick: () => void; additionStyle?: string }) {
  return <div className={`${style.overlay} ${additionStyle ?? ''}`} onClick={onClick}></div>
}
