import { addDays, beforeToday, setDateToEndOfDay, setDateToStartOfDay } from '@deanslist-platform/api-core-data-access'
import { Prisma, Project } from '@prisma/client'

export function normalizeProjectUpdateInput({
  input,
  found,
}: {
  input: Prisma.ProjectUpdateInput
  found: Project
}): Prisma.ProjectUpdateInput {
  let durationDays: number = typeof input.durationDays === 'number' ? input.durationDays : found.durationDays
  let endDate: Date | null = found.endDate
  let startDate: Date | null = found.startDate

  // If we receive a duration, we want to make sure it's a number higher than 1
  if (typeof input.durationDays !== 'undefined') {
    if (typeof input.durationDays !== 'number' || input.durationDays < 1) {
      throw new Error('Duration must be a number higher than 0')
    }
    durationDays = input.durationDays
  }

  // If we receive a startDate, we want to set it to the start of the day
  if (input.startDate) {
    startDate = setDateToStartOfDay(input.startDate as string)
    // If it's a date in before today, we want to throw an error
    if (beforeToday(startDate)) {
      throw new Error('Start date must be in the future.')
    }
  }

  // Calculate the endDate based on the duration and startDate and update if it's different than the current endDate
  if (durationDays && startDate) {
    const calculatedEndDate = setDateToEndOfDay(addDays({ date: startDate, days: durationDays }))

    if (calculatedEndDate.getTime() !== found.endDate?.getTime()) {
      endDate = calculatedEndDate
    }
  }

  return {
    ...input,
    durationDays,
    startDate,
    endDate,
  }
}
