import React from 'react';
import Card from '../card/card';
import styles from './card-modal.module.css';

function CardModal({
  card,
  onClose,
  onCardLike,
}: {
  card: any;
  onClose: () => void;
  onCardLike: (
    currentUserId: number | null,
    likedUserId: number | null,
    isLiked: boolean,
    card: any,
  ) => void;
}) {
  return (
    <div className={styles.popup}>
      <div style={{ maxWidth: '90%' }}>
        <Card
          username={card.username}
          description={card.description}
          image={card.image}
          isLiked={card.isLiked}
          actualJob={card.actualJob}
          card={card}
          onCardClick={() => {}}
          isPopup={true}
          onClose={onClose}
          onCardLike={onCardLike}
        />
      </div>
    </div>
  );
}

export default CardModal;
