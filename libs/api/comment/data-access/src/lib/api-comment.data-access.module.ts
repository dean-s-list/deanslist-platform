import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { Module } from '@nestjs/common'
import { ApiCommentResolveAdminService } from './api-comment-resolve-admin.service'
import { ApiCommentResolveUserService } from './api-comment-resolve-user.service'
import { ApiCommentService } from './api-comment.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCommentService, ApiCommentResolveUserService, ApiCommentResolveAdminService],
  exports: [ApiCommentService],
})
export class ApiCommentDataAccessModule {}
