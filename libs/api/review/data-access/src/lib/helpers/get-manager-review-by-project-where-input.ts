import { Prisma } from '@prisma/client'
import { ManagerFindManyReviewByProjectInput } from '../dto/manager-find-many-review-by-project-input'

export function getManagerReviewByProjectWhereInput(
  input: ManagerFindManyReviewByProjectInput,
): Prisma.ReviewWhereInput {
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
