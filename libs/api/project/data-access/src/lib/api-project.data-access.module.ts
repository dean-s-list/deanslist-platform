import { ApiCommunityDataAccessModule } from '@deanslist-platform/api-community-data-access'
import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { Module } from '@nestjs/common'
import { ApiProjectDataAdminService } from './api-project-data-admin.service'
import { ApiProjectDataManagerService } from './api-project-data-manager.service'
import { ApiProjectDataReviewerService } from './api-project-data-reviewer.service'
import { ApiProjectDataService } from './api-project-data.service'
import { ApiProjectEventService } from './api-project-event.service'
import { ApiProjectProvisionService } from './api-project-provision.service'
import { ApiProjectService } from './api-project.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiCommunityDataAccessModule],
  providers: [
    ApiProjectDataAdminService,
    ApiProjectDataManagerService,
    ApiProjectDataReviewerService,
    ApiProjectDataService,
    ApiProjectEventService,
    ApiProjectProvisionService,
    ApiProjectService,
  ],
  exports: [ApiProjectService],
})
export class ApiProjectDataAccessModule {}
