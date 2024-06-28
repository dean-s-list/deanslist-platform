import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { Module } from '@nestjs/common'
import { ApiCommentResolveAdminService } from './api-comment-resolve-admin.service'
import { ApiCommentResolveManagerService } from './api-comment-resolve-manager.service'
import { ApiCommentResolveReviewerService } from './api-comment-resolve-reviewer.service'
import { ApiCommentService } from './api-comment.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [
    ApiCommentService,
    ApiCommentResolveReviewerService,
    ApiCommentResolveManagerService,
    ApiCommentResolveAdminService,
  ],
  exports: [ApiCommentService],
})
export class ApiCommentDataAccessModule {}
