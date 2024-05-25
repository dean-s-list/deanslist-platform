import { Resolver } from '@nestjs/graphql'
import { ApiCommentService } from '@deanslist-platform/api-comment-data-access'
import { Comment } from '@deanslist-platform/api-comment-data-access'

@Resolver(() => Comment)
export class ApiCommentResolver {
  constructor(private readonly service: ApiCommentService) {}
}
