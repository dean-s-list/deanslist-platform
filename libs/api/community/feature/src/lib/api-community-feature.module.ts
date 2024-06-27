import { ApiCommunityDataAccessModule } from '@deanslist-platform/api-community-data-access'
import { Module } from '@nestjs/common'
import { ApiCommunityAdminResolver } from './api-community-admin-resolver'
import { ApiCommunityManagerResolver } from './api-community-manager-resolver'
import { ApiCommunityUserResolver } from './api-community-user-resolver'
import { ApiCommunityResolver } from './api-community.resolver'

@Module({
  imports: [ApiCommunityDataAccessModule],
  providers: [ApiCommunityAdminResolver, ApiCommunityManagerResolver, ApiCommunityResolver, ApiCommunityUserResolver],
})
export class ApiCommunityFeatureModule {}
