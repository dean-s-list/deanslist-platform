import { User } from '@deanslist-platform/api-user-data-access'
import { Prisma, UserRole } from '@prisma/client'
import { ManagerFindManyCommunityInput } from '../dto/manager-find-many-community.input'

export function getManagerCommunityWhereInput(
  { id: userId, role }: User,
  input: ManagerFindManyCommunityInput,
): Prisma.CommunityWhereInput {
  const where: Prisma.CommunityWhereInput = {
    managers: role === UserRole.Admin ? undefined : { some: { userId } },
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
