import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { Module } from '@nestjs/common'
import { ApiTeamDataService } from './api-team-data.service'
import { ApiTeamEventService } from './api-team-event.service'
import { ApiTeamResolveAdminService } from './api-team-resolve-admin.service'
import { ApiTeamResolveManagerService } from './api-team-resolve-manager.service'
import { ApiTeamResolveUserService } from './api-team-resolve-user.service'
import { ApiTeamService } from './api-team.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [
    ApiTeamService,
    ApiTeamDataService,
    ApiTeamEventService,
    ApiTeamResolveManagerService,
    ApiTeamResolveAdminService,
    ApiTeamResolveUserService,
  ],
  exports: [ApiTeamService],
})
export class ApiTeamDataAccessModule {}
