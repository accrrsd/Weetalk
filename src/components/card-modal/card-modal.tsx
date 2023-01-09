import React from 'react';
import Card from '../card/card';
import styles from './card-modal.module.css';

function CardModal({ card, onClose }: { card: any; onClose: () => void }) {
  console.log(card);
  return (
    <div className={styles.popup}>
      <div style={{ maxWidth: '90%' }}>
        <Card
          title={card.title}
          about={card.about}
          photo={card.photo}
          isLiked={card.isLiked}
          text={card.text}
          card={card}
          onCardClick={() => {}}
          isPopup={true}
          onClose={onClose}
        />
      </div>
    </div>
  );
}

export default CardModal;