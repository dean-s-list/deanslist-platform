import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { Module } from '@nestjs/common'
import { ApiCommunityDataAdminService } from './api-community-data-admin.service'
import { ApiCommunityDataManagerService } from './api-community-data-manager.service'
import { ApiCommunityDataUserService } from './api-community-data-user.service'
import { ApiCommunityDataService } from './api-community-data.service'
import { ApiCommunityEventService } from './api-community-event.service'
import { ApiCommunityProvisionService } from './api-community-provision.service'
import { ApiCommunityService } from './api-community.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [
    ApiCommunityService,
    ApiCommunityDataService,
    ApiCommunityEventService,
    ApiCommunityDataManagerService,
    ApiCommunityDataAdminService,
    ApiCommunityDataUserService,
    ApiCommunityProvisionService,
  ],
  exports: [ApiCommunityService],
})
export class ApiCommunityDataAccessModule {}
