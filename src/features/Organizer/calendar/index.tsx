import styles from './calendar.module.css'
import { SetStateAction, useEffect, useState } from 'react'
import { useAppSelector } from '../../../hooks/storeHooks'
import { ensure } from '../../../utils/functions'
import { Dispatch } from 'react'

interface ICalendar {
  index: number
  name: string
  days: number
  startWith: string
  eventsDates: Array<string | number>
}

export const Calendar = ({
  selectedDate,
  setSelectedDate,
  isCreatePage,
}: {
  selectedDate: string
  setSelectedDate?: Dispatch<SetStateAction<string>>
  isCreatePage: boolean
}) => {
  useEffect(() => {
    getSelectedDate(selectedDate)
  }, [selectedDate])
  const [currentMonth, setCurrentMonth] = useState<ICalendar>({
    index: 0,
    name: '',
    days: 0,
    startWith: '',
    eventsDates: [],
  })
  const [selectedDay, setSelectedDay] = useState('0')
  console.log(selectedDate)
  const getSelectedDate = (selectedDate: string) => {
    const dateArr = selectedDate.split('-')
    const month = dateArr[1]
    const day =
      dateArr[2] && dateArr[2][0] === '0' ? dateArr[2].substring(1) : dateArr[2]
    console.log(day)
    setVisibleMonth(isNaN(Number(month) - 1) ? 1 : Number(month) - 1)
    setSelectedDay(day)
    console.log(selectedDay)
  }

  const [visibleMonth, setVisibleMonth] = useState<number>(
    new Date().getMonth()
  )
  useEffect(() => {
    setCurrentMonth(ensure(calendar.find(el => el.index === visibleMonth)))
  }, [visibleMonth])
  const { data } = useAppSelector(state => state.managerReducer)
  const weekdays: string[] = ['П', 'В', 'С', 'Ч', 'П', 'С', 'В']
  const currentYear: number = new Date().getFullYear()
  const today: number = new Date().getDate()
  const month: string = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    today
  ).toLocaleString('ru', { month: 'long' })

  let eventDates: string[] = []
  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate()
  }
  const getFirstDay = (month: number, year: number) => {
    return new Date(year, month, 1).toLocaleString('ru', { weekday: 'long' })
  }
  const calendar: Array<ICalendar> = [
    {
      index: 0,
      name: 'январь',
      days: daysInMonth(1, currentYear),
      startWith: getFirstDay(0, currentYear),
      eventsDates: [],
    },
    {
      index: 1,
      name: 'февраль',
      days: daysInMonth(2, currentYear),
      startWith: getFirstDay(1, currentYear),
      eventsDates: [],
    },
    {
      index: 2,
      name: 'март',
      days: daysInMonth(3, currentYear),
      startWith: getFirstDay(2, currentYear),
      eventsDates: [],
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
  const currentDays: number[] = Array.apply(
    null,
    Array(currentMonth?.days)
  ).map((x, i) => i + 1)

  console.log(currentMonth)

  const getEventDates = () => {
    const rooms = data.rooms
    rooms?.map(el => {
      if (el.beginingDate) {
        eventDates.push(el.beginingDate)
      }
      return el
    })
    eventDates = eventDates.map(el => {
      if (el[0] === '0') {
        el = el.substring(1)
      }
      if (el[2] === '0') {
        el = el.replace('0', '')
      }
      return el
    })
  }
  getEventDates()
  const getRealDates = () => {
    calendar.map(el => {
      const date = eventDates.filter(
        date => Number(date.split('-')[1]) === el.index + 1
      )
      if (date) {
        date.forEach(selectedDate => {
          el.eventsDates.push(Number(selectedDate.split('-')[0]))
        })
      }
      return el
    })
  }
  getRealDates()
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

  const nextMonth = () => {
    visibleMonth !== 11
      ? setVisibleMonth(state => state + 1)
      : setVisibleMonth(0)
    setSelectedDay('0')
  }

  const prevMonth = () => {
    visibleMonth !== 0
      ? setVisibleMonth(state => state - 1)
      : setVisibleMonth(11)
    setSelectedDay('0')
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
        {currentDays.map(el => (
          <div
            key={Math.random()}
            className={
              el === today &&
              currentMonth.name === month &&
              currentMonth.eventsDates.includes(el)
                ? styles.day + ' ' + styles.today + ' ' + styles.event
                : el === today && currentMonth.name === month
                ? styles.day + ' ' + styles.today
                : currentMonth.eventsDates.includes(el)
                ? styles.event + ' ' + styles.day
                : Number(selectedDay) === el && Number(selectedDay) !== 0
                ? styles.daySelected + ' ' + styles.day
                : styles.day
            }
            style={{ pointerEvents: el === 0 ? 'none' : 'initial' }}
            onClick={() => {
              isCreatePage &&
                setSelectedDate?.(
                  `2023-${
                    String(currentMonth.index).split('').length === 1
                      ? '0' + (currentMonth.index + 1)
                      : currentMonth.index + 1
                  }-${String(el).split('').length === 1 ? '0' + el : el}`
                )
            }}
          >
            {el === 0 ? ' ' : el}
            {currentMonth.eventsDates.filter(x => x === el).length > 1 && (
              <div className={styles.indicator}>
                {currentMonth.eventsDates.filter(x => x === el).length}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
