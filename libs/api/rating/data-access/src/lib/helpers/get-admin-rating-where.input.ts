import { Prisma } from '@prisma/client'
import { AdminFindManyRatingInput } from '../dto/admin-find-many-rating.input'

export function getAdminRatingWhereInput(input: AdminFindManyRatingInput): Prisma.RatingWhereInput {
  const where: Prisma.RatingWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { content: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
