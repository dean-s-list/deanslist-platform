import { ApiCommentDataAccessModule } from '@deanslist-platform/api-comment-data-access'
import { Module } from '@nestjs/common'
import { ApiCommentAdminResolver } from './api-comment-admin.resolver'
import { ApiCommentManagerResolver } from './api-comment-manager-resolver'
import { ApiCommentReviewerResolver } from './api-comment-reviewer-resolver'
import { ApiCommentResolver } from './api-comment.resolver'

@Module({
  imports: [ApiCommentDataAccessModule],
  providers: [ApiCommentResolver, ApiCommentManagerResolver, ApiCommentReviewerResolver, ApiCommentAdminResolver],
})
export class ApiCommentFeatureModule {}
