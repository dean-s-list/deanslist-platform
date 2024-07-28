import { User } from '@deanslist-platform/api-user-data-access'
import { Prisma, ProjectStatus } from '@prisma/client'
import { ManagerFindManyProjectInput } from '../dto/manager-find-many-project.input'
import { getProjectWhereManagerAccessInput } from './get-project-where-manager-access-input'

export function getProjectWhereManagerInput(user: User, input: ManagerFindManyProjectInput): Prisma.ProjectWhereInput {
  const where: Prisma.ProjectWhereInput = {
    communityId: input.communityId ?? undefined,
    status: input.status ?? ProjectStatus.Active,
    ...getProjectWhereManagerAccessInput(user),
  }

  if (input.search) {
    where.OR = [
      ...(where.OR ?? []),
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
      { slug: { contains: input.search, mode: 'insensitive' } },
      { managers: { some: { username: { contains: input.search, mode: 'insensitive' } } } },
      { community: { id: { contains: input.search, mode: 'insensitive' } } },
      { community: { name: { contains: input.search, mode: 'insensitive' } } },
      { reviews: { some: { id: { contains: input.search, mode: 'insensitive' } } } },
      { reviews: { some: { comments: { some: { content: { contains: input.search, mode: 'insensitive' } } } } } },
    ]
  }

  return where
}
