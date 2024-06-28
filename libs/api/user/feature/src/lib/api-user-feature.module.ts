import { ApiUserDataAccessModule } from '@deanslist-platform/api-user-data-access'
import { Module } from '@nestjs/common'
import { ApiUserAdminResolver } from './api-user-admin.resolver'
import { ApiUserAnonController } from './api-user-anon.controller'
import { ApiUserUserResolver } from './api-user-user.resolver'
import { ApiUserResolver } from './api-user.resolver'

@Module({
  controllers: [ApiUserAnonController],
  imports: [ApiUserDataAccessModule],
  providers: [ApiUserResolver, ApiUserAdminResolver, ApiUserUserResolver],
})
export class ApiUserFeatureModule {}
