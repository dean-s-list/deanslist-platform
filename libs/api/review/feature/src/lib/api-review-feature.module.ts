import { ApiReviewDataAccessModule } from '@deanslist-platform/api-review-data-access'
import { Module } from '@nestjs/common'
import { ApiReviewAdminResolver } from './api-review-admin.resolver'
import { ApiReviewReviewerResolver } from './api-review-reviewer.resolver'
import { ApiReviewResolver } from './api-review.resolver'

@Module({
  imports: [ApiReviewDataAccessModule],
  providers: [ApiReviewResolver, ApiReviewReviewerResolver, ApiReviewAdminResolver],
})
export class ApiReviewFeatureModule {}
