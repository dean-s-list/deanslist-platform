import { Prisma } from '@prisma/client'
import { ManagerFindManyCommunityInput } from '../dto/manager-find-many-community.input'

export function getManagerCommunityWhereInput(input: ManagerFindManyCommunityInput): Prisma.CommunityWhereInput {
  const where: Prisma.CommunityWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
