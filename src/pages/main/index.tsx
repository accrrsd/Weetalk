import CardWrapper from '../../components/card-wrapper/card-wrapper';
import { useEffect, useState } from 'react';

export default function Main() {
  const [cards, setInitialCards] = useState([]);
  const getInitialCards = () => {
    return fetch(`http://95-163-235-246.cloudvps.regruhosting.ru:8080/users`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };
  useEffect(() => {
    getInitialCards()
      .then((card) => {
        setInitialCards(card);
        console.log(card);
      })
      .catch((error) => console.log(`Error: ${error}`));
  }, []);

  return <CardWrapper array={cards} title={'Люди рядом'} users={cards} />;
}
