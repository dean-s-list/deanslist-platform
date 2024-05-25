import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { Module } from '@nestjs/common'
import { ApiReviewResolveAdminService } from './api-review-resolve-admin.service'
import { ApiReviewResolveUserService } from './api-review-resolve-user.service'
import { ApiReviewService } from './api-review.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiReviewService, ApiReviewResolveUserService, ApiReviewResolveAdminService],
  exports: [ApiReviewService],
})
export class ApiReviewDataAccessModule {}
