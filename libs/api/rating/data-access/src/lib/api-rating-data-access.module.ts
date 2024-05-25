import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { ApiRatingService } from './api-rating.service'
import { ApiUserRatingService } from './api-user-rating.service'
import { ApiAdminRatingService } from './api-admin-rating.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiRatingService, ApiUserRatingService, ApiAdminRatingService],
  exports: [ApiRatingService],
})
export class ApiRatingDataAccessModule {}
