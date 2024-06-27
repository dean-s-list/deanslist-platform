import { Prisma } from '@prisma/client'
import { ManagerFindManyCommunityInput } from '../dto/manager-find-many-community.input'

export function getManagerCommunityWhereInput(
  userId: string,
  input: ManagerFindManyCommunityInput,
): Prisma.CommunityWhereInput {
  const where: Prisma.CommunityWhereInput = {
    managers: { some: { userId } },
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
