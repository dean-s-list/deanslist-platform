import { setDateToEndOfDay } from '@deanslist-platform/api-core-data-access'

export function getRemainingDays(date: Date): number {
  const difference = setDateToEndOfDay(new Date(date)).getTime() - new Date().getTime()

  if (difference < 0) {
    return 0
  }

  return Math.floor(difference / (1000 * 60 * 60 * 24))
}
