import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { ManagerFindManyCommentInput } from './dto/manager-find-many-comment.input'
import { Comment } from './entity/comment.entity'
import { getCommentWhereManagerInput } from './helpers/get-comment-where-manager.input'

@Injectable()
export class ApiCommentResolveManagerService {
  constructor(private readonly core: ApiCoreService) {}

  async findManyComment(input: ManagerFindManyCommentInput): Promise<Comment[]> {
    return this.core.data.comment.findMany({
      orderBy: [
        // Order by ratings count first, then by createdAt
        { ratings: { _count: 'asc' } },
        { createdAt: 'asc' },
      ],
      where: getCommentWhereManagerInput(input),
      include: {
        author: true,
        review: {
          include: { projectMember: { include: { user: true } } },
        },
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
}
