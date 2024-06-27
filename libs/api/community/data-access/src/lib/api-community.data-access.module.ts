import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { Module } from '@nestjs/common'
import { ApiCommunityDataService } from './api-community-data.service'
import { ApiCommunityEventService } from './api-community-event.service'
import { ApiCommunityResolveAdminService } from './api-community-resolve-admin.service'
import { ApiCommunityResolveManagerService } from './api-community-resolve-manager.service'
import { ApiCommunityResolveUserService } from './api-community-resolve-user.service'
import { ApiCommunityService } from './api-community.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [
    ApiCommunityService,
    ApiCommunityDataService,
    ApiCommunityEventService,
    ApiCommunityResolveManagerService,
    ApiCommunityResolveAdminService,
    ApiCommunityResolveUserService,
  ],
  exports: [ApiCommunityService],
})
export class ApiCommunityDataAccessModule {}
