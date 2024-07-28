import { Prisma } from '@prisma/client'
import { AdminFindManyReviewInput } from '../dto/admin-find-many-review.input'

export function getAdminReviewWhereInput(input: AdminFindManyReviewInput): Prisma.ReviewWhereInput {
  const where: Prisma.ReviewWhereInput = {
    projectId: input.projectId,
  }

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
