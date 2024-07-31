import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { ApiProjectDataAccessModule } from '@deanslist-platform/api-project-data-access'
import { Module } from '@nestjs/common'
import { ApiReviewResolveAdminService } from './api-review-resolve-admin.service'
import { ApiReviewResolveManagerService } from './api-review-resolve-manager.service'
import { ApiReviewResolveReviewerService } from './api-review-resolve-reviewer.service'
import { ApiReviewService } from './api-review.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiProjectDataAccessModule],
  providers: [
    ApiReviewService,
    ApiReviewResolveReviewerService,
    ApiReviewResolveManagerService,
    ApiReviewResolveAdminService,
  ],
  exports: [ApiReviewService],
})
export class ApiReviewDataAccessModule {}
