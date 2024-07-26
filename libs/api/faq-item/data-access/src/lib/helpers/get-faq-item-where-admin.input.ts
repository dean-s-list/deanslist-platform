import { Prisma } from '@prisma/client'
import { FaqItemAdminFindManyInput } from '../dto/faq-item-admin-find-many.input'

export function getFaqItemWhereAdminInput(input: FaqItemAdminFindManyInput): Prisma.FaqItemWhereInput {
  const where: Prisma.FaqItemWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { question: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
