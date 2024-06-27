import { ReviewerFindManyReviewByUsernameInput } from '@deanslist-platform/api-review-data-access'
import { Prisma } from '@prisma/client'

export function getReviewerReviewByUsernameWhereInput(
  input: ReviewerFindManyReviewByUsernameInput,
): Prisma.ReviewWhereInput {
  const where: Prisma.ReviewWhereInput = {
    reviewer: { username: input.username },
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { project: { name: { contains: input.search, mode: 'insensitive' } } },
      { project: { id: { contains: input.search, mode: 'insensitive' } } },
      {
        project: {
          managers: { some: { username: { contains: input.search, mode: 'insensitive' } } },
        },
      },
    ]
  }

  return where
}
