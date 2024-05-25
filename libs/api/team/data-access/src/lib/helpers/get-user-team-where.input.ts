import { Prisma } from '@prisma/client'
import { UserFindManyTeamInput } from '../dto/user-find-many-team.input'

export function getUserTeamWhereInput(input: UserFindManyTeamInput): Prisma.TeamWhereInput {
  const where: Prisma.TeamWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
