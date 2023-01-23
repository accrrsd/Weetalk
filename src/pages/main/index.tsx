import CardWrapper from '../../components/card-wrapper/card-wrapper';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../utils/api';

export default function Main() {
  const [cards, setInitialCards] = useState([]);
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);

  useEffect(() => {
    getAllUsers(localStorage.getItem('ownerId'))
      .then(card => {
        setInitialCards(card);
      })
      .catch(error => console.log(`Error: ${error}`))
      .finally(() => {
        setIsUsersLoaded(true);
      });
  }, []);

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
