import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { Module } from '@nestjs/common'
import { ApiAdminRatingService } from './api-admin-rating.service'
import { ApiManagerRatingService } from './api-manager-rating.service'
import { ApiRatingService } from './api-rating.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiRatingService, ApiManagerRatingService, ApiAdminRatingService],
  exports: [ApiRatingService],
})
export class ApiRatingDataAccessModule {}
