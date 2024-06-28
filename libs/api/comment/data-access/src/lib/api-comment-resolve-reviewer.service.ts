import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { ReviewerCreateCommentInput } from './dto/reviewer-create-comment.input'
import { ReviewerFindManyCommentInput } from './dto/reviewer-find-many-comment.input'
import { ReviewerUpdateCommentInput } from './dto/reviewer-update-comment.input'
import { Comment } from './entity/comment.entity'
import { getCommentWhereReviewerInput } from './helpers/get-comment-where-reviewer.input'

@Injectable()
export class ApiCommentResolveReviewerService {
  constructor(private readonly core: ApiCoreService) {}

  async createComment(userId: string, input: ReviewerCreateCommentInput) {
    return this.core.data.comment.create({ data: { ...input, authorId: userId } })
  }

  async deleteComment(commentId: string) {
    const deleted = await this.core.data.comment.delete({ where: { id: commentId } })
    return !!deleted
  }

  async findManyComment(input: ReviewerFindManyCommentInput): Promise<Comment[]> {
    return this.core.data.comment.findMany({
      orderBy: { createdAt: 'asc' },
      where: getCommentWhereReviewerInput(input),
      include: {
        author: true,
        children: {
          orderBy: { createdAt: 'asc' },
          include: { author: true },
        },
        ratings: {
          orderBy: { createdAt: 'asc' },
          include: { author: true },
        },
      },
    })
  }

  async updateComment(commentId: string, input: ReviewerUpdateCommentInput) {
    return this.core.data.comment.update({ where: { id: commentId }, data: input })
  }
}
