import style from './main.module.css';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import photo from '../../images/test-photo-1.png';
import photo2 from '../../images/test-photo-2.png';
import photo3 from '../../images/test-photo-3.jpg';
import photo4 from '../../images/test-photo-4.jpg';
import { useEffect, useState } from 'react';
import Card from '../../components/card/card';
import CardModal from '../../components/card-modal/card-modal';

export default function Main() {
  const cards = [
    {
      title: 'Иван Ковалев',
      about: 'Backend-Developer',
      photo,
      isLiked: true,
      text: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo invento perspiciatis unde omnis iste ',
    },
    {
      title: 'Анна Макарова',
      about: 'Менеджер',
      photo: photo2,
      isLiked: true,
      text: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo invento perspiciatis unde omnis iste ',
    },
    {
      title: 'Вика Лау',
      about: 'Ивент-менеджер',
      photo: photo3,
      isLiked: false,
      text: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa"',
    },
    {
      title: 'Сергей Афанасьев',
      about: 'Тим Лид ',
      photo: photo4,
      isLiked: false,
      text: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo invento perspiciatis unde omnis iste ',
    },
    {
      title: 'Анна Макарова',
      about: 'Менеджер',
      photo: photo2,
      isLiked: true,
      text: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo invento perspiciatis unde omnis iste ',
    },
    {
      title: 'Иван Ковалев',
      about: 'Backend-Developer',
      photo,
      isLiked: true,
      text: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo invento perspiciatis unde omnis iste ',
    },
    {
      title: 'Сергей Афанасьев',
      about: 'Тим Лид ',
      photo: photo4,
      isLiked: false,
      text: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo invento perspiciatis unde omnis iste ',
    },
    {
      title: 'Вика Лау',
      about: 'Ивент-менеджер',
      photo: photo3,
      isLiked: false,
      text: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa"',
    },
  ];
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
          <h1 className={style.title}>Люди рядом</h1>
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
          {cards.map((el) => (
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
