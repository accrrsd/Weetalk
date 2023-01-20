import CardWrapper from '../../components/card-wrapper/card-wrapper';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../utils/api';
export default function Main() {
  const [cards, setInitialCards] = useState([]);
  useEffect(() => {
    getAllUsers(localStorage.getItem('ownerId'))
      .then((card) => {
        setInitialCards(card);
        console.log(card);
      })
      .catch((error) => console.log(`Error: ${error}`));
  }, []);

  return <CardWrapper array={cards} title={'Люди рядом'} users={cards} />;
}
