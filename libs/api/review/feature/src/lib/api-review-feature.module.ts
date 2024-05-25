import { ApiReviewDataAccessModule } from '@deanslist-platform/api-review-data-access'
import { Module } from '@nestjs/common'
import { ApiReviewAdminResolver } from './api-review-admin.resolver'
import { ApiReviewUserResolver } from './api-review-user.resolver'
import { ApiReviewResolver } from './api-review.resolver'

@Module({
  imports: [ApiReviewDataAccessModule],
  providers: [ApiReviewResolver, ApiReviewUserResolver, ApiReviewAdminResolver],
})
export class ApiReviewFeatureModule {}
