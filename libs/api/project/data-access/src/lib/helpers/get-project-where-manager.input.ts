import { Prisma } from '@prisma/client'
import { ManagerFindManyProjectInput } from '../dto/manager-find-many-project.input'
import { getProjectWhereManagerAccessInput } from './get-project-where-manager-access-input'

export function getProjectWhereManagerInput(
  userId: string,
  input: ManagerFindManyProjectInput,
): Prisma.ProjectWhereInput {
  const where: Prisma.ProjectWhereInput = {
    communityId: input.communityId ?? undefined,
    ...getProjectWhereManagerAccessInput(userId),
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
    ]
  }

  return where
}
