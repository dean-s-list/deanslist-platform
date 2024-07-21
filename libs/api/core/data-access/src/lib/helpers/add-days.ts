import { dayjs } from './extended-dayjs'

export function addDays({ date, days }: { date: Date; days: number }): Date {
  if (days < 0) {
    throw new Error('Duration must be positive')
  }
  return dayjs.utc(date).add(days, 'day').toDate()
}
