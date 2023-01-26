import { useEffect, useState } from 'react'
import style from './input-calendar.module.css'
import { DateRange } from 'react-date-range'
import { TDateRange } from '../../utils/types'

//@ts-ignore:next-line
import * as rdrLocales from 'react-date-range/dist/locale'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

export const InputCalendar = ({ dateStateHandler }: { dateStateHandler: (arg0: TDateRange) => void }) => {
  const ruLocale = rdrLocales.ru
  const [calendarState, setCalendarState] = useState<any>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
      color: '#7e7ee7',
    },
  ])
  useEffect(() => {
    const { startDate, endDate } = calendarState
    dateStateHandler({ startDate, endDate })
  }, [calendarState, dateStateHandler])

  return (
    <div className={style.wrapper}>
      <DateRange
        locale={ruLocale}
        editableDateInputs={true}
        onChange={(item) => setCalendarState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={calendarState}
      />
    </div>
  )
}
