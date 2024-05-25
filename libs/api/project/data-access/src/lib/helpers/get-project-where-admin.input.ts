import { Prisma } from '@prisma/client'
import { AdminFindManyProjectInput } from '../dto/admin-find-many-project.input'

export function getProjectWhereAdminInput(input: AdminFindManyProjectInput): Prisma.ProjectWhereInput {
  const where: Prisma.ProjectWhereInput = {
    teamId: input.teamId ?? undefined,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
