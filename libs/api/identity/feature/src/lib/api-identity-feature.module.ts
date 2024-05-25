import { ApiIdentityDataAccessModule } from '@deanslist-platform/api-identity-data-access'
import { Module } from '@nestjs/common'
import { ApiIdentityAdminResolver } from './api-identity-admin.resolver'
import { ApiIdentityAnonResolver } from './api-identity-anon.resolver'
import { ApiIdentityUserResolver } from './api-identity-user.resolver'
import { ApiIdentityResolver } from './api-identity.resolver'

@Module({
  imports: [ApiIdentityDataAccessModule],
  providers: [ApiIdentityAdminResolver, ApiIdentityAnonResolver, ApiIdentityResolver, ApiIdentityUserResolver],
})
export class ApiIdentityFeatureModule {}
