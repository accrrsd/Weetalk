import React, { useEffect, useState } from 'react'
import styles from './welcome.module.css'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import photo1 from '../../../images/Application/welcome-1.jpg'
import photo2 from '../../../images/Application/welcome-2.jpg'
import photo3 from '../../../images/Application/welcome-3.jpg'
import photo4 from '../../../images/Application/welcome-4.jpg'
import { useNavigate } from 'react-router-dom'

function Welcome() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [, setSwiperUpdated] = useState(0)
  const [swiper, setSwiper] = useState<SwiperType | null>(null)

  useEffect(() => {
    const swipeSlidesByClick = (e: { target: any; clientX: number }) => {
      const clickTarget = e.target
      const clickTargetWidth = clickTarget.offsetWidth
      const xAxisTarget = e.clientX - clickTarget.getBoundingClientRect().left
      if (swiper) {
        if (clickTargetWidth / 2 > xAxisTarget) {
          // clicked left
          swiper.slidePrev()
        } else {
          // clicked right
          if (swiper.isEnd) {
            localStorage.setItem('welcomeState', 'done')
            navigate('/application/guests')
          } else {
            swiper.slideNext()
          }
        }
      }
    }
    setTimeout(() => {
      document.addEventListener('click', swipeSlidesByClick)
    }, 0)
    return () => {
      document.removeEventListener('click', swipeSlidesByClick)
    }
  }, [navigate, swiper])
  return (
    <div className={styles.container} style={step === 2 ? { display: 'block' } : {}}>
      <button
        className={styles.skipBtn}
        onClick={() => {
          localStorage.setItem('welcomeState', 'done')
          navigate('/application/guests')
        }}
      >
        {swiper && swiper.isEnd ? 'Закрыть' : 'Пропустить'}
      </button>
      {step === 1 ? (
        <div className={styles.welcome}>
          <h1 className={styles.title}>Добро пожаловать в Weetalk!</h1>
          <p className={styles.text}>С нами тебе станет легче находить полезные знакомства</p>
          <button className={styles.continueBtn} onClick={() => setStep(2)}>
            Начнем
          </button>
        </div>
      ) : (
        <div className={`${styles.slider} welcome-slider`}>
          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: false,
              el: `.welcome-pagination`,
            }}
            spaceBetween={250}
            slidesPerView={1}
            onRealIndexChange={(swiper) => setSwiperUpdated(swiper.realIndex)}
            onSwiper={(swiper) => setSwiper(swiper)}
          >
            <SwiperSlide>
              <div className={styles.slide}>
                <p className={styles.slideText}>Теперь ты сможешь узнать больше о тех, кто сегодня оказался рядом с тобой</p>
                <img src={photo1} className={styles.slideImg} alt="Фото" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.slide}>
                <p className={styles.slideText}>Отметить интересных для общения людей, чтобы они точно не потерялись</p>
                <img src={photo2} className={styles.slideImg} alt="Фото" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.slide}>
                <p className={styles.slideText}>А еще ознакомиться с нашими советами для начала общения с незнакомым человеком</p>
                <img src={photo3} className={styles.slideImg} alt="Фото" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.slide}>
                <p className={styles.slideText}>Ты всегда можешь изменить информацию в карточке или поменять фото</p>
                <img src={photo4} className={styles.slideImg} alt="Фото" />
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="welcome-pagination"></div>
        </div>
      )}
    </div>
  )
}

export default Welcome
