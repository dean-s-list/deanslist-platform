import { dayjs } from './extended-dayjs'
import { setDateToStartOfDay } from './set-date-to-start-of-day'

export function beforeToday(date: string | Date) {
  return dayjs(setDateToStartOfDay(date)).isBefore(setDateToStartOfDay(dayjs().toDate()), 'day')
}
