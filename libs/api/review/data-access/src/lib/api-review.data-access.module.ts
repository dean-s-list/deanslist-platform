import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { Module } from '@nestjs/common'
import { ApiReviewResolveAdminService } from './api-review-resolve-admin.service'
import { ApiReviewResolveReviewerService } from './api-review-resolve-reviewer.service'
import { ApiReviewService } from './api-review.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiReviewService, ApiReviewResolveReviewerService, ApiReviewResolveAdminService],
  exports: [ApiReviewService],
})
export class ApiReviewDataAccessModule {}
