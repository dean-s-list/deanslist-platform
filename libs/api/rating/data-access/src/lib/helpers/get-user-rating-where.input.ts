import { Prisma } from '@prisma/client'
import { ManagerFindManyRatingInput } from '../dto/manager-find-many-rating.input'

export function getUserRatingWhereInput(input: ManagerFindManyRatingInput): Prisma.RatingWhereInput {
  const where: Prisma.RatingWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { content: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
