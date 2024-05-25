import { ApiRatingDataAccessModule } from '@deanslist-platform/api-rating-data-access'
import { Module } from '@nestjs/common'
import { ApiRatingAdminResolver } from './api-rating-admin.resolver'
import { ApiRatingUserResolver } from './api-rating-user.resolver'
import { ApiRatingResolver } from './api-rating.resolver'

@Module({
  imports: [ApiRatingDataAccessModule],
  providers: [ApiRatingResolver, ApiRatingUserResolver, ApiRatingAdminResolver],
})
export class ApiRatingFeatureModule {}
