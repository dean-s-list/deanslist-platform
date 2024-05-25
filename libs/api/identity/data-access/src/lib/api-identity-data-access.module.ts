import { Module } from '@nestjs/common'
import { ApiAuthDataAccessModule } from '@deanslist-platform/api-auth-data-access'
import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { ApiAdminIdentityService } from './api-admin-identity.service'
import { ApiUserIdentityService } from './api-user-identity.service'
import { ApiIdentityService } from './api-identity.service'
import { ApiAnonIdentityService } from './api-anon-identity.service'
import { ApiSolanaIdentityService } from './api-solana-identity.service'

@Module({
  imports: [ApiAuthDataAccessModule, ApiCoreDataAccessModule],
  providers: [
    ApiAdminIdentityService,
    ApiAnonIdentityService,
    ApiIdentityService,
    ApiSolanaIdentityService,
    ApiUserIdentityService,
  ],
  exports: [ApiIdentityService],
})
export class ApiIdentityDataAccessModule {}
