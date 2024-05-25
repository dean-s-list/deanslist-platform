import { Prisma } from '@prisma/client'
import { UserFindManyCommentInput } from '../dto/user-find-many-comment.input'

export function getCommentWhereUserInput(input: UserFindManyCommentInput): Prisma.CommentWhereInput {
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
