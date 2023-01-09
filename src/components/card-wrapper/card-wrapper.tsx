import style from './card-wrapper.module.css';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useEffect, useState } from 'react';
import Card from '../../components/card/card';
import CardModal from '../../components/card-modal/card-modal';

export default function CardWrapper({
  array,
  title,
}: {
  array: any;
  title: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columns, setColumns] = useState(2);
  const [selectedCard, setSelectedCard] = useState({});
  const handleButtonClick = () => {
    if (columns === 2) {
      setColumns(1);
    } else {
      setColumns(2);
    }
  };
  const handleCardClick = (card: object) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };
  const handleClosePopup = () => {
    setIsModalOpen(false);
  };
  const handleLikeCard = () => {};
  useEffect(() => {
    function closeByClickOutside(evt: any) {
      if (evt.target.classList[0].split('__')[0] === 'card-modal_popup') {
        setIsModalOpen(false);
      }
    }
    if (isModalOpen) {
      document.addEventListener('mousedown', closeByClickOutside);
      return () => {
        document.removeEventListener('mousedown', closeByClickOutside);
      };
    }
  }, [isModalOpen]);
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.heading}>
          <h1 className={style.title}>{title}</h1>
          <button
            className={
              columns === 2
                ? style.button
                : style.button + ' ' + style.buttonOneColumn
            }
            onClick={handleButtonClick}
          ></button>
        </div>
        <Masonry columnsCount={columns} gutter={'16px'}>
          {array.map((el: any) => (
            <Card
              title={el.title}
              about={el.about}
              photo={el.photo}
              isLiked={el.isLiked}
              columns={columns}
              text={el.text}
              card={el}
              key={Math.random() * 100}
              onCardClick={handleCardClick}
            />
          ))}
        </Masonry>
        {isModalOpen && (
          <CardModal card={selectedCard} onClose={handleClosePopup} />
        )}
      </div>
    </>
  );
}
