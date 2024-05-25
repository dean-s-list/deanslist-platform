import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { AdminFindManyCommentInput } from './dto/admin-find-many-comment.input'
import { AdminUpdateCommentInput } from './dto/admin-update-comment.input'
import { Comment } from './entity/comment.entity'
import { getCommentWhereAdminInput } from './helpers/get-comment-where-admin.input'

@Injectable()
export class ApiCommentResolveAdminService {
  constructor(private readonly core: ApiCoreService) {}

  async deleteComment(commentId: string) {
    const deleted = await this.core.data.comment.delete({ where: { id: commentId } })
    return !!deleted
  }

  async findManyComment(input: AdminFindManyCommentInput): Promise<Comment[]> {
    return this.core.data.comment.findMany({
      orderBy: { createdAt: 'asc' },
      where: getCommentWhereAdminInput(input),
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

  async updateComment(commentId: string, input: AdminUpdateCommentInput) {
    return this.core.data.comment.update({ where: { id: commentId }, data: input })
  }
}
