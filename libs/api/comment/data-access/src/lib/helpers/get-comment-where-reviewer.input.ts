import { Prisma } from '@prisma/client'
import { ReviewerFindManyCommentInput } from '../dto/reviewer-find-many-comment.input'

export function getCommentWhereReviewerInput(input: ReviewerFindManyCommentInput): Prisma.CommentWhereInput {
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
