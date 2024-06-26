import { ApiTeamDataAccessModule } from '@deanslist-platform/api-team-data-access'
import { Module } from '@nestjs/common'
import { ApiTeamAdminResolver } from './api-team-admin-resolver'
import { ApiTeamManagerResolver } from './api-team-manager-resolver'
import { ApiTeamUserResolver } from './api-team-user-resolver'
import { ApiTeamResolver } from './api-team.resolver'

@Module({
  imports: [ApiTeamDataAccessModule],
  providers: [ApiTeamAdminResolver, ApiTeamManagerResolver, ApiTeamResolver, ApiTeamUserResolver],
})
export class ApiTeamFeatureModule {}
