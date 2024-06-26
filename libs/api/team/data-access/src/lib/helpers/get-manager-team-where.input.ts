import { Prisma } from '@prisma/client'
import { ManagerFindManyTeamInput } from '../dto/manager-find-many-team.input'

export function getManagerTeamWhereInput(input: ManagerFindManyTeamInput): Prisma.TeamWhereInput {
  const where: Prisma.TeamWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
