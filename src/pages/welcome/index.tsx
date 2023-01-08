import React, { useState } from 'react';
import styles from './welcome.module.css';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
/*import 'swiper/css/pagination';*/
import photo1 from '../../images/welcome-1.jpg';
import photo2 from '../../images/welcome-2.jpg';
import photo3 from '../../images/welcome-3.jpg';
import photo4 from '../../images/welcome-4.jpg';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <div
      className={styles.container}
      style={step === 2 ? { display: 'block' } : {}}
    >
      <button className={styles.skipBtn} onClick={() => navigate('/guests')}>
        {currentSlide === 3 ? 'Закрыть' : 'Пропустить'}
      </button>
      {step === 1 ? (
        <div className={styles.welcome}>
          <h1 className={styles.title}>Добро пожаловать в Weetalk!</h1>
          <p className={styles.text}>
            С нами тебе станет легче находить полезные знакомства
          </p>
          <button className={styles.continueBtn} onClick={() => setStep(2)}>
            Начнем
          </button>
        </div>
      ) : (
        <div className={`${styles.slider} welcome-slider`}>
          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: true,
              el: `.welcome-pagination`,
            }}
            spaceBetween={250}
            slidesPerView={1}
            onSwiper={(swiper) => console.log(swiper)}
            onRealIndexChange={(swiper) => setCurrentSlide(swiper.realIndex)}
          >
            <SwiperSlide>
              <div className={styles.slide}>
                <p className={styles.slideText}>
                  Теперь ты сможешь узнать больше о тех, кто сегодня оказался
                  рядом с тобой
                </p>
                <img src={photo1} className={styles.slideImg} alt="Фото" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.slide}>
                <p className={styles.slideText}>
                  Отметить интересных для общения людей, чтобы они точно не
                  потерялись
                </p>
                <img src={photo2} className={styles.slideImg} alt="Фото" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.slide}>
                <p className={styles.slideText}>
                  А еще ознакомиться с нашими советами для начала общения с
                  незнакомым человеком
                </p>
                <img src={photo4} className={styles.slideImg} alt="Фото" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.slide}>
                <p className={styles.slideText}>
                  Ты всегда можешь изменить информацию в карточке или поменять
                  фото
                </p>
                <img src={photo3} className={styles.slideImg} alt="Фото" />
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="welcome-pagination"></div>
        </div>
      )}
    </div>
  );
}

export default Welcome;
