import photo from '../../images/test-photo-1.png';
import photo2 from '../../images/test-photo-2.png';
import photo3 from '../../images/test-photo-3.jpg';
import photo4 from '../../images/test-photo-4.jpg';
import CardWrapper from '../../components/card-wrapper/card-wrapper';

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
  return <CardWrapper array={cards} title={'Люди рядом'} />;
}
