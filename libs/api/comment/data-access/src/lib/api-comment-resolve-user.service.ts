import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { UserCreateCommentInput } from './dto/user-create-comment.input'
import { UserFindManyCommentInput } from './dto/user-find-many-comment.input'
import { UserUpdateCommentInput } from './dto/user-update-comment.input'
import { Comment } from './entity/comment.entity'
import { getCommentWhereUserInput } from './helpers/get-comment-where-user.input'

@Injectable()
export class ApiCommentResolveUserService {
  constructor(private readonly core: ApiCoreService) {}

  async createComment(userId: string, input: UserCreateCommentInput) {
    return this.core.data.comment.create({ data: { ...input, authorId: userId } })
  }

  async deleteComment(commentId: string) {
    const deleted = await this.core.data.comment.delete({ where: { id: commentId } })
    return !!deleted
  }

  async findManyComment(input: UserFindManyCommentInput): Promise<Comment[]> {
    return this.core.data.comment.findMany({
      orderBy: { createdAt: 'asc' },
      where: getCommentWhereUserInput(input),
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

  async updateComment(commentId: string, input: UserUpdateCommentInput) {
    return this.core.data.comment.update({ where: { id: commentId }, data: input })
  }
}
