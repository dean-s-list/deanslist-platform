import { Prisma } from '@prisma/client'
import { AdminFindManyCommentInput } from '../dto/admin-find-many-comment.input'

export function getCommentWhereAdminInput(input: AdminFindManyCommentInput): Prisma.CommentWhereInput {
  const where: Prisma.CommentWhereInput = {
    reviewId: input.reviewId,
    parentId: null,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { content: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
