import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { ApiTeamDataAccessModule } from '@deanslist-platform/api-team-data-access'
import { Module } from '@nestjs/common'
import { ApiProjectDataService } from './api-project-data.service'
import { ApiProjectEventService } from './api-project-event.service'
import { ApiProjectResolveAdminService } from './api-project-resolve-admin.service'
import { ApiProjectResolveManagerService } from './api-project-resolve-manager.service'
import { ApiProjectResolveUserService } from './api-project-resolve-user.service'
import { ApiProjectService } from './api-project.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiTeamDataAccessModule],
  providers: [
    ApiProjectDataService,
    ApiProjectEventService,
    ApiProjectResolveAdminService,
    ApiProjectResolveManagerService,
    ApiProjectResolveUserService,
    ApiProjectService,
  ],
  exports: [ApiProjectService],
})
export class ApiProjectDataAccessModule {}
