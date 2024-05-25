import { Prisma } from '@prisma/client'
import { AdminFindManyTeamInput } from '../dto/admin-find-many-team.input'

export function getAdminTeamWhereInput(input: AdminFindManyTeamInput): Prisma.TeamWhereInput {
  const where: Prisma.TeamWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
