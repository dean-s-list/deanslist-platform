import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { ApiCommunityDataAccessModule } from '@deanslist-platform/api-community-data-access'
import { Module } from '@nestjs/common'
import { ApiProjectDataService } from './api-project-data.service'
import { ApiProjectEventService } from './api-project-event.service'
import { ApiProjectResolveAdminService } from './api-project-resolve-admin.service'
import { ApiProjectResolveManagerService } from './api-project-resolve-manager.service'
import { ApiProjectResolveReviewerService } from './api-project-resolve-reviewer.service'
import { ApiProjectService } from './api-project.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiCommunityDataAccessModule],
  providers: [
    ApiProjectDataService,
    ApiProjectEventService,
    ApiProjectResolveAdminService,
    ApiProjectResolveManagerService,
    ApiProjectResolveReviewerService,
    ApiProjectService,
  ],
  exports: [ApiProjectService],
})
export class ApiProjectDataAccessModule {}
