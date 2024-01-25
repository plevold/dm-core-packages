import { Icon } from '@equinor/eds-core-react'
import {
  calendar_today,
  chevron_down,
  chevron_left,
  chevron_right,
} from '@equinor/eds-icons'
import { DateTime } from 'luxon'
import { ReactElement, useState } from 'react'
import {
  CALENDAR_MONTHS,
  DateSelection,
  THIS_MONTH,
  THIS_YEAR,
  calendar,
  getNextMonth,
  getPreviousMonth,
  isDateInDatelist,
  isSameDay,
  isSameMonth,
} from './calendarUtils'

interface CalendarProps {
  dateTime: DateTime | null
  handleDateSelection: (selection: DateSelection) => void
  highlightedDates?: Date[]
}

export const Calendar = (props: CalendarProps): ReactElement => {
  const { dateTime, handleDateSelection } = props
  const [showMonthPicker, setShowMonthPicker] = useState(false)
  const [activeMonth, setActiveMonth] = useState<number>(
    dateTime?.month ?? THIS_MONTH
  )
  const [activeYear, setActiveYear] = useState<number>(
    dateTime?.year ?? THIS_YEAR
  )
  const cal = calendar(activeMonth, activeYear)

  const currentMonthName = Object.keys(CALENDAR_MONTHS)[activeMonth - 1]

  function incrementMonth(): void {
    const nextMonth = getNextMonth(activeMonth, activeYear)
    setActiveMonth(nextMonth.month)
    setActiveYear(nextMonth.year)
  }

  function decrementMonth(): void {
    const prevMonth = getPreviousMonth(activeMonth, activeYear)
    setActiveMonth(prevMonth.month)
    setActiveYear(prevMonth.year)
  }

  function goToToday(): void {
    const now = DateTime.now()
    handleDateSelection({ day: now.day, month: now.month, year: now.year })
    setActiveMonth(THIS_MONTH)
    setActiveYear(THIS_YEAR)
  }

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center mb-3'>
        <button
          type='button'
          onClick={() => setShowMonthPicker(!showMonthPicker)}
          className={'flex group hover:text-equinor-green items-center gap-1'}
        >
          <span>
            {currentMonthName} {activeYear}
          </span>
          <span
            className={
              'transition-all duration-250 ' +
              (showMonthPicker ? 'rotate-180' : '')
            }
          >
            <Icon
              className={
                'group-hover:bg-equinor-lightgreen rounded-full transition-all duration-250'
              }
              data={chevron_down}
            />
          </span>
        </button>
        <div className='flex gap-2 justify-between items-center'>
          <button
            type='button'
            onClick={() => decrementMonth()}
            aria-label='Previous month'
            className='flex items-center rounded-full hover:bg-equinor-lightgreen hover:text-equinor-green'
          >
            <Icon data={chevron_left} />
          </button>
          <button
            type='button'
            onClick={() => goToToday()}
            aria-label='Go to today'
            className=' p-0.5flex items-center rounded-full hover:bg-equinor-lightgreen hover:text-equinor-green'
          >
            <Icon data={calendar_today} size={16} />
          </button>

          <button
            type='button'
            onClick={() => incrementMonth()}
            aria-label='Next month'
            className='flex items-center rounded-full hover:bg-equinor-lightgreen hover:text-equinor-green'
          >
            <Icon data={chevron_right} />
          </button>
        </div>
      </div>
      {showMonthPicker ? (
        <>
          <div className='flex flex-col mb-3'>
            <span className='text-sm text-gray-600'>Year</span>
            <input
              className='border border-gray-300 rounded px-2 py-1'
              type='number'
              value={activeYear}
              onChange={(event) => setActiveYear(Number(event.target.value))}
            />
          </div>
          <div className=''>
            <span className='text-sm text-gray-600'>Month</span>
            <div className='grid grid-cols-3 gap-2.5 rounded py-2'>
              {Object.keys(CALENDAR_MONTHS).map((month, index) => (
                <button
                  type='button'
                  onClick={() => {
                    setActiveMonth(index + 1)
                    setShowMonthPicker(false)
                  }}
                  className={
                    'hover:bg-equinor-lightgreen hover:text-equinor-green px-2 rounded py-1 ' +
                    (index + 1 === activeMonth
                      ? 'bg-equinor-lightgreen text-equinor-green'
                      : '')
                  }
                  key={index}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className='grid grid-cols-7 gap-1'>
          {cal.map((date, index) => {
            const hasData = isDateInDatelist(
              DateTime.fromObject(date).toJSDate(),
              props.highlightedDates
            )

            return (
              <button
                type='button'
                onClick={() => handleDateSelection(date)}
                aria-label={`${date.day}. ${
                  Object.keys(CALENDAR_MONTHS)[date.month - 1]
                }`}
                className={`
                p-1.5 w-9 rounded-full justify-center hover:bg-equinor-lightgreen hover:text-equinor-green ${
                  isSameDay(
                    DateTime.fromObject(date).toJSDate(),
                    dateTime ? dateTime.toJSDate() : DateTime.now().toJSDate()
                  )
                    ? 'bg-equinor-lightgreen text-equinor-green font-medium'
                    : isSameMonth(
                          DateTime.fromObject(date).toJSDate(),
                          DateTime.fromObject({
                            year: activeYear,
                            month: activeMonth,
                          }).toJSDate()
                        )
                      ? ''
                      : 'text-slate-400'
                }
                ${hasData ? 'font-bold underline' : ''}
              `}
                key={index}
              >
                {date.day}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
