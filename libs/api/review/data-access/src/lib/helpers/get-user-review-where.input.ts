import { Prisma } from '@prisma/client'
import { UserFindManyReviewInput } from '../dto/user-find-many-review.input'

export function getUserReviewWhereInput(input: UserFindManyReviewInput): Prisma.ReviewWhereInput {
  const where: Prisma.ReviewWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { project: { name: { contains: input.search, mode: 'insensitive' } } },
      { project: { id: { contains: input.search, mode: 'insensitive' } } },
      { reviewer: { name: { contains: input.search, mode: 'insensitive' } } },
      { reviewer: { username: { contains: input.search, mode: 'insensitive' } } },
      { reviewer: { id: { contains: input.search, mode: 'insensitive' } } },
    ]
  }

  return where
}
