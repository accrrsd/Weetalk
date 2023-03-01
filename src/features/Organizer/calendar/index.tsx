import styles from './calendar.module.css'
import { useEffect, useState } from 'react'

export const Calendar = () => {
  const weekdays = ['П', 'В', 'С', 'Ч', 'П', 'С', 'В']
  /*  const getMonths = () => {
    // @ts-ignore
    return [...Array(12).keys()]
      .map(key => new Date(0, key).toLocaleString('ru', { month: 'long' }))
      .map((el, i) => el[0].toUpperCase() + el.slice(1) + ' ' + i)
  }*/

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate()
  }

  const getFirstDay = (month: number, year: number) => {
    return new Date(year, month, 1).toLocaleString('ru', { weekday: 'long' })
  }

  const today = new Date().getDate()
  const month = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    today
  ).toLocaleString('ru', { month: 'long' })

  const [visibleMonth, setVisibleMonth] = useState<number>(
    new Date().getMonth()
  )

  const calendar = [
    {
      index: 0,
      name: 'январь',
      days: daysInMonth(1, new Date().getFullYear()),
      startWith: getFirstDay(0, new Date().getFullYear()),
      eventsDates: [22, 25],
    },
    {
      index: 1,
      name: 'февраль',
      days: daysInMonth(2, new Date().getFullYear()),
      startWith: getFirstDay(1, new Date().getFullYear()),
      eventsDates: [],
    },
    {
      index: 2,
      name: 'март',
      days: daysInMonth(3, new Date().getFullYear()),
      startWith: getFirstDay(2, new Date().getFullYear()),
      eventsDates: [5, 5, 7, 7, 7, 7],
    },
    {
      index: 3,
      name: 'апрель',
      days: daysInMonth(4, new Date().getFullYear()),
      startWith: getFirstDay(3, new Date().getFullYear()),
      eventsDates: [],
    },
    {
      index: 4,
      name: 'май',
      days: daysInMonth(5, new Date().getFullYear()),
      startWith: getFirstDay(4, new Date().getFullYear()),
      eventsDates: [],
    },
    {
      index: 5,
      name: 'июнь',
      days: daysInMonth(6, new Date().getFullYear()),
      startWith: getFirstDay(5, new Date().getFullYear()),
      eventsDates: [],
    },
    {
      index: 6,
      name: 'июль',
      days: daysInMonth(7, new Date().getFullYear()),
      startWith: getFirstDay(6, new Date().getFullYear()),
      eventsDates: [],
    },
    {
      index: 7,
      name: 'август',
      days: daysInMonth(8, new Date().getFullYear()),
      startWith: getFirstDay(7, new Date().getFullYear()),
      eventsDates: [],
    },
    {
      index: 8,
      name: 'сентябрь',
      days: daysInMonth(9, new Date().getFullYear()),
      startWith: getFirstDay(8, new Date().getFullYear()),
      eventsDates: [],
    },
    {
      index: 9,
      name: 'октябрь',
      days: daysInMonth(10, new Date().getFullYear()),
      startWith: getFirstDay(9, new Date().getFullYear()),
      eventsDates: [],
    },
    {
      index: 10,
      name: 'ноябрь',
      days: daysInMonth(11, new Date().getFullYear()),
      startWith: getFirstDay(10, new Date().getFullYear()),
      eventsDates: [],
    },
    {
      index: 11,
      name: 'декабрь',
      days: daysInMonth(12, new Date().getFullYear()),
      startWith: getFirstDay(11, new Date().getFullYear()),
      eventsDates: [],
    },
  ]
  const currentMonth = calendar.find(el => el.index === visibleMonth)
  const currentDays = Array.apply(null, Array(currentMonth?.days)).map(
    (x, i) => i + 1
  )

  const getActualDays = () => {
    if (currentMonth?.startWith === 'понедельник') {
      return
    }
    if (currentMonth?.startWith === 'вторник') {
      for (let i = 0; i < 1; i++) {
        currentDays.unshift(0)
      }
    }
    if (currentMonth?.startWith === 'среда') {
      for (let i = 0; i < 2; i++) {
        currentDays.unshift(0)
      }
    }
    if (currentMonth?.startWith === 'четверг') {
      for (let i = 0; i < 3; i++) {
        currentDays.unshift(0)
      }
    }
    if (currentMonth?.startWith === 'пятница') {
      for (let i = 0; i < 4; i++) {
        currentDays.unshift(0)
      }
    }
    if (currentMonth?.startWith === 'суббота') {
      for (let i = 0; i < 5; i++) {
        currentDays.unshift(0)
      }
    }
    if (currentMonth?.startWith === 'воскресенье') {
      for (let i = 0; i < 6; i++) {
        currentDays.unshift(0)
      }
    }
  }
  getActualDays()

  console.log(currentDays)
  console.log(currentMonth)

  const nextMonth = () => {
    visibleMonth !== 11
      ? setVisibleMonth(state => state + 1)
      : setVisibleMonth(0)
  }

  const prevMonth = () => {
    visibleMonth !== 0
      ? setVisibleMonth(state => state - 1)
      : setVisibleMonth(11)
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.navigation}>
        <button onClick={() => prevMonth()} className={styles.arrow}></button>
        <div className={styles.month}>{currentMonth?.name}</div>
        <button onClick={() => nextMonth()} className={styles.arrow}></button>
      </div>
      <div className={styles.weekdays}>
        {weekdays.map(el => (
          <div key={Math.random()} className={styles.weekday}>
            {el}
          </div>
        ))}
      </div>
      <div className={styles.days}>
        {currentDays.map((el, index) => (
          <div
            key={Math.random()}
            className={
              el === today &&
              currentMonth?.name === month &&
              currentMonth?.eventsDates.includes(el)
                ? styles.day + ' ' + styles.today + ' ' + styles.event
                : el === today && currentMonth?.name === month
                ? styles.day + ' ' + styles.today
                : currentMonth?.eventsDates.includes(el)
                ? styles.event + ' ' + styles.day
                : styles.day
            }
          >
            {el === 0 ? ' ' : el}
            {
              //@ts-ignore
              currentMonth?.eventsDates.filter(x => x === el).length > 1 && (
                <div className={styles.indicator}>
                  {currentMonth?.eventsDates.filter(x => x === el).length}
                </div>
              )
            }
          </div>
        ))}
      </div>
    </div>
  )
}
