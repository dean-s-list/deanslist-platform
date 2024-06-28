import { Prisma } from '@prisma/client'
import { ManagerFindManyCommentInput } from '../dto/manager-find-many-comment.input'

export function getCommentWhereManagerInput(input: ManagerFindManyCommentInput): Prisma.CommentWhereInput {
  const where: Prisma.CommentWhereInput = {
    review: { projectId: input.projectId },
    parentId: null,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { content: { contains: input.search, mode: 'insensitive' } },
      { author: { username: { contains: input.search, mode: 'insensitive' } } },
      { ratings: { some: { content: { contains: input.search, mode: 'insensitive' } } } },
      { ratings: { some: { author: { username: { contains: input.search, mode: 'insensitive' } } } } },
    ]
  }

  return where
}
