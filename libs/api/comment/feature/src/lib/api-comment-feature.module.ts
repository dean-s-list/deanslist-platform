import { ApiCommentDataAccessModule } from '@deanslist-platform/api-comment-data-access'
import { Module } from '@nestjs/common'
import { ApiCommentAdminResolver } from './api-comment-admin.resolver'
import { ApiCommentUserResolver } from './api-comment-user.resolver'
import { ApiCommentResolver } from './api-comment.resolver'

@Module({
  imports: [ApiCommentDataAccessModule],
  providers: [ApiCommentResolver, ApiCommentUserResolver, ApiCommentAdminResolver],
})
export class ApiCommentFeatureModule {}
