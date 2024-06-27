import { Prisma } from '@prisma/client'
import { ReviewerFindManyReviewByUsernameInput } from '../dto/reviewer-find-many-review-by-username-input'

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
      {
        comments: { some: { content: { contains: input.search, mode: 'insensitive' } } },
      },
    ]
  }

  return where
}
