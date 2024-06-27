import { Prisma, ProjectStatus } from '@prisma/client'
import { UserFindManyProjectInput } from '../dto/user-find-many-project.input'

export function getProjectWhereUserInput(input: UserFindManyProjectInput): Prisma.ProjectWhereInput {
  const where: Prisma.ProjectWhereInput = {
    teamId: input.teamId ?? undefined,
    status: input.status ?? ProjectStatus.Active,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
