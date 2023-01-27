import style from './card-wrapper.module.css';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useEffect, useState } from 'react';
import Card from '../../components/card/card';
import CardModal from '../../components/card-modal/card-modal';
import { TitleSmart } from '../title-smart/title-smart';
import { addUserLike, removeUserLike } from '../../utils/api';
import { Oval } from 'react-loader-spinner';

export default function CardWrapper({
  array,
  title,
  users,
  favorites,
  setUsers,
  setFavorites,
  isUsersLoaded,
  isFavoritesLoaded,
}: {
  array: Array<any>;
  title: string;
  users?: any;
  favorites?: any;
  setUsers?: Function;
  setFavorites?: Function;
  isUsersLoaded?: boolean;
  isFavoritesLoaded?: boolean;
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

  const changeLikeStatus = (
    currentUserId: number | null,
    likedUserId: number | null,
    isLiked: boolean
  ) => {
    if (!isLiked) {
      return addUserLike(currentUserId, likedUserId).catch(error =>
        console.log(`Error: ${error}`)
      );
    } else {
      return removeUserLike(currentUserId, likedUserId).catch(error =>
        console.log(`Error: ${error}`)
      );
    }
  };
  const handleLike = (
    currentUserId: number | null,
    likedUserId: number | null,
    isLiked: boolean,
    card: any
  ) => {
    changeLikeStatus(currentUserId, likedUserId, isLiked).then(() => {
      if (users !== undefined) {
        card.isLiked = !card.isLiked;
        setUsers?.((state: Array<any>) =>
          state.map(c => (c.id === card.id ? card : c))
        );
      }
      if (favorites !== undefined) {
        card.isLiked = !card.isLiked;
        setFavorites?.((state: Array<any>) =>
          state.filter(c => c.isLiked === true)
        );
      }
    });
  };
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
    <div className={style.wrapper}>
      <TitleSmart
        text={title}
        haveButton={true}
        buttonStyle={
          columns === 2
            ? style.button
            : style.button + ' ' + style.buttonOneColumn
        }
        textStyle={style.title}
        wrapperStyle={style.heading}
        onButtonClick={handleButtonClick}
      />
      {!isUsersLoaded && !isFavoritesLoaded ? (
        <Oval
          height={60}
          width={60}
          color="#7e7ee7"
          wrapperStyle={{}}
          wrapperClass={style.loader}
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#d9d9f8"
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
      ) : (
        <Masonry columnsCount={columns} gutter={'16px'}>
          {array.map((el: any) => (
            <Card
              username={el.username}
              description={el.description}
              image={el.image}
              isLiked={el.isLiked}
              columns={columns}
              actualJob={el.actualJob}
              card={el}
              key={el.id}
              onCardClick={handleCardClick}
              onCardLike={handleLike}
            />
          ))}
        </Masonry>
      )}
      {isModalOpen && (
        <CardModal
          card={selectedCard}
          onCardLike={handleLike}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}
