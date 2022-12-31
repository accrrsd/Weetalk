import style from './main.module.css';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import photo from '../../images/test-photo-1.png';
import photo2 from '../../images/test-photo-2.png';
import { useState } from 'react';

export default function Main() {
  const [columns, setColumns] = useState(2);
  const handleButtonClick = () => {
    if (columns === 2) {
      setColumns(1);
    } else {
      setColumns(2);
    }
  };
  const handleCardClick = () => {
    /* когда будем получать данные с сервера */
  };
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.heading}>
          <h1 className={style.title}>Участники мероприятия</h1>
          <button className={style.button} onClick={handleButtonClick}>
            <span className={style.buttonSquare}></span>
            <span className={style.buttonSquare}></span>
            <span className={style.buttonSquare}></span>
            <span className={style.buttonSquare}></span>
          </button>
        </div>
        <Masonry columnsCount={columns} gutter={'12px'}>
          <div className={style.card}>
            <img className={style.cardPhoto} src={photo2} alt="Участник" />
            <div className={style.cardInfo}>
              <h2 className={style.cardTitle}>Ирен Аси</h2>
              <p className={style.cardAbout}>Стажер в Сбербанке</p>
            </div>
          </div>
          <div className={style.card}>
            <img className={style.cardPhoto} src={photo} alt="Участник" />
            <div className={style.cardInfo}>
              <h2 className={style.cardTitle}>Ирен Аси</h2>
              <p className={style.cardAbout}>Стажер в Сбербанке</p>
            </div>
          </div>
          <div className={style.card}>
            <img className={style.cardPhoto} src={photo} alt="Участник" />
            <div className={style.cardInfo}>
              <h2 className={style.cardTitle}>Ирен Аси</h2>
              <p className={style.cardAbout}>Стажер в Сбербанке</p>
            </div>
          </div>
          <div className={style.card}>
            <img className={style.cardPhoto} src={photo2} alt="Участник" />
            <div className={style.cardInfo}>
              <h2 className={style.cardTitle}>Ирен Аси</h2>
              <p className={style.cardAbout}>Стажер в Сбербанке</p>
            </div>
          </div>
          <div className={style.card}>
            <img className={style.cardPhoto} src={photo} alt="Участник" />
            <div className={style.cardInfo}>
              <h2 className={style.cardTitle}>Ирен Аси</h2>
              <p className={style.cardAbout}>Стажер в Сбербанке</p>
            </div>
          </div>
        </Masonry>
      </div>
    </>
  );
}
