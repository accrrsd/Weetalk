import CardWrapper from '../../components/card-wrapper/card-wrapper';
import { useEffect, useRef, useState } from 'react';
import { getAllUsers } from '../../utils/api';

export default function Main() {
  const [cards, setInitialCards] = useState([]);
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    getAllUsers(localStorage.getItem('ownerId'))
      .then(card => {
        setInitialCards(card);
      })
      .catch(error => console.log(`Error: ${error}`));
  }, []);

  useEffect(() => {
    const loadImage = (card: any) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = `http://weetalk.online/img/${card.image}`;
        loadImg.onload = () => resolve(card);
        loadImg.onerror = err => reject(err);
      });
    };
    // Избавляемся от первого рендера
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    Promise.all(cards.map(card => loadImage(card)))
      .then(() => setIsUsersLoaded(true))
      .catch(err => console.log('Failed to load data', err));
  }, [cards]);

  return (
    <CardWrapper
      array={cards}
      setUsers={setInitialCards}
      title={'Люди рядом'}
      users={cards}
      isUsersLoaded={isUsersLoaded}
    />
  );
}
