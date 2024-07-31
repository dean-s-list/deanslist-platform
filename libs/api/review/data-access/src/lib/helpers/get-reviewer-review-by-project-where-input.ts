import { Prisma } from '@prisma/client'
import { ReviewerFindManyReviewByProjectInput } from '../dto/reviewer-find-many-review-by-project-input'

export function getReviewerReviewByProjectWhereInput(
  input: ReviewerFindManyReviewByProjectInput,
): Prisma.ReviewWhereInput {
  const where: Prisma.ReviewWhereInput = {
    projectMember: { projectId: input.projectId },
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
