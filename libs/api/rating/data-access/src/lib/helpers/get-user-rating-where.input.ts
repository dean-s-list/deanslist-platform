import { Prisma } from '@prisma/client'
import { UserFindManyRatingInput } from '../dto/user-find-many-rating.input'

export function getUserRatingWhereInput(
  input: UserFindManyRatingInput,
): Prisma.RatingWhereInput {
  const where: Prisma.RatingWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { content: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
