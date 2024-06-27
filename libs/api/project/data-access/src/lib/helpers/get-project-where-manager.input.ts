import { Prisma } from '@prisma/client'
import { ManagerFindManyProjectInput } from '../dto/manager-find-many-project.input'

export function getProjectWhereManagerInput(
  userId: string,
  input: ManagerFindManyProjectInput,
): Prisma.ProjectWhereInput {
  const where: Prisma.ProjectWhereInput = {
    communityId: input.communityId ?? undefined,
    OR: [
      {
        managers: { some: { id: userId } },
      },
      {
        community: { managers: { some: { userId, admin: true } } },
      },
    ],
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
