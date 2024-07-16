export function getEndDate(input: { duration?: number | null; startDate?: Date | null }) {
  // Duration in weeks
  const duration = input.duration || 0

  const startDate = input.startDate || new Date()

  return new Date(startDate.getTime() + duration * 7 * 24 * 60 * 60 * 1000)
}
