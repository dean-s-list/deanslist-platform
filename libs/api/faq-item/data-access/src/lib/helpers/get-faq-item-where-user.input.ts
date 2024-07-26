import { Prisma } from '@prisma/client'
import { FaqItemUserFindManyInput } from '../dto/faq-item-user-find-many.input'

export function getFaqItemWhereUserInput(input: FaqItemUserFindManyInput): Prisma.FaqItemWhereInput {
  const where: Prisma.FaqItemWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { question: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
