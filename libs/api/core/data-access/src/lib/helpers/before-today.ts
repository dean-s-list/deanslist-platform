export function beforeToday(date: string | Date) {
  return new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
}
