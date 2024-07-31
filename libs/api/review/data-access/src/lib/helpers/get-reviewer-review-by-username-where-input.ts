import { Prisma } from '@prisma/client'
import { ReviewerFindManyReviewByUsernameInput } from '../dto/reviewer-find-many-review-by-username-input'

export function getReviewerReviewByUsernameWhereInput(
  input: ReviewerFindManyReviewByUsernameInput,
): Prisma.ReviewWhereInput {
  const where: Prisma.ReviewWhereInput = {
    projectMember: { user: { username: input.username } },
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { comments: { some: { content: { contains: input.search, mode: 'insensitive' } } } },
      {
        projectMember: {
          OR: [
            {
              project: {
                OR: [
                  { name: { contains: input.search, mode: 'insensitive' } },
                  { id: { contains: input.search, mode: 'insensitive' } },
                  {
                    members: { some: { user: { username: { contains: input.search, mode: 'insensitive' } } } },
                  },
                ],
              },
            },
            {
              user: {
                OR: [
                  { name: { contains: input.search, mode: 'insensitive' } },
                  { username: { contains: input.search, mode: 'insensitive' } },
                  { id: { contains: input.search, mode: 'insensitive' } },
                ],
              },
            },
          ],
        },
      },
    ]
  }

  return where
}
