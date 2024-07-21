import { Prisma, ProjectStatus } from '@prisma/client'
import { ReviewerFindManyProjectInput } from '../dto/reviewer-find-many-project-input'

export function getProjectWhereUserInput(input: ReviewerFindManyProjectInput): Prisma.ProjectWhereInput {
  const where: Prisma.ProjectWhereInput = {
    communityId: input.communityId ?? undefined,
    status: input.status ?? ProjectStatus.Active,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { community: { id: { contains: input.search, mode: 'insensitive' } } },
      { community: { name: { contains: input.search, mode: 'insensitive' } } },
      { slug: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
