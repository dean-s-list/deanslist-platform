import { dayjs } from './extended-dayjs'

export function setDateToEndOfDay(date: string | Date) {
  return dayjs
    .utc(date as string)
    .endOf('day')
    .toDate()
}
