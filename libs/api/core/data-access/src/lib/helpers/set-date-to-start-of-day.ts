import { dayjs } from './extended-dayjs'

export function setDateToStartOfDay(date: string | Date) {
  return dayjs
    .utc(date as string)
    .startOf('day')
    .toDate()
}
