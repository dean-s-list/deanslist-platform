import { ApiRatingDataAccessModule } from '@deanslist-platform/api-rating-data-access'
import { Module } from '@nestjs/common'
import { ApiRatingAdminResolver } from './api-rating-admin.resolver'
import { ApiRatingManagerResolver } from './api-rating-manager.resolver'
import { ApiRatingResolver } from './api-rating.resolver'

@Module({
  imports: [ApiRatingDataAccessModule],
  providers: [ApiRatingResolver, ApiRatingManagerResolver, ApiRatingAdminResolver],
})
export class ApiRatingFeatureModule {}
