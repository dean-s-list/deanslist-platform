import { addDays, beforeToday, setDateToEndOfDay, setDateToStartOfDay } from '@deanslist-platform/api-core-data-access'
import { Project } from '@prisma/client'

export function calculateProjectDates({
  input,
  found,
  allowStartDateInPast = false,
}: {
  found?: Project
  input: { durationDays?: number | null; startDate: Date | string | null }
  allowStartDateInPast?: boolean
}): { endDate: Date | null; durationDays: number; startDate: Date | null } {
  let durationDays: number = typeof input.durationDays === 'number' ? input.durationDays : found?.durationDays ?? 7
  let endDate: Date | null = found?.endDate ?? null
  let startDate: Date | null = found?.startDate ?? null

  // If we receive a duration, we want to make sure it's a number higher than 1
  if (typeof input.durationDays !== 'undefined') {
    if (typeof input.durationDays !== 'number') {
      throw new Error('Duration must be a number')
    }
    if (input.durationDays < 1) {
      throw new Error(`Duration must be higher than 0`)
    }
    if (input.durationDays > 365) {
      throw new Error(`Duration must be less than 1 year`)
    }
    durationDays = input.durationDays
  }

  // If we receive a startDate, we want to set it to the start of the day
  if (input.startDate) {
    startDate = setDateToStartOfDay(input.startDate as string) as Date
    // If it's a date in before today, we want to throw an error
    if (beforeToday(startDate) && !allowStartDateInPast) {
      throw new Error('Start date must be in the future.')
    }
  }

  // Calculate the endDate based on the duration and startDate and update if it's different than the current endDate
  if (durationDays && startDate) {
    const calculatedEndDate = setDateToEndOfDay(addDays({ date: startDate, days: durationDays }))

    if (calculatedEndDate.getTime() !== found?.endDate?.getTime()) {
      endDate = calculatedEndDate
    }
  }

  return {
    durationDays,
    startDate,
    endDate,
  }
}
