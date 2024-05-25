import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { Module } from '@nestjs/common'
import { ApiUserDataService } from './api-user-data.service'
import { ApiUserEventService } from './api-user-event.service'
import { ApiUserResolveAdminService } from './api-user-resolve-admin.service'
import { ApiUserResolveUserService } from './api-user-resolve-user.service'
import { ApiUserService } from './api-user.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [
    ApiUserService,
    ApiUserDataService,
    ApiUserEventService,
    ApiUserResolveAdminService,
    ApiUserResolveUserService,
  ],
  exports: [ApiUserService],
})
export class ApiUserDataAccessModule {}
