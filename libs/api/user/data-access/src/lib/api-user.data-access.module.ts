import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { Module } from '@nestjs/common'
import { ApiUserDataAdminService } from './api-user-data-admin.service'
import { ApiUserDataAnonService } from './api-user-data-anon.service'
import { ApiUserDataUserService } from './api-user-data-user.service'
import { ApiUserDataService } from './api-user-data.service'
import { ApiUserEventService } from './api-user-event.service'
import { ApiUserService } from './api-user.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [
    ApiUserService,
    ApiUserDataService,
    ApiUserDataAnonService,
    ApiUserEventService,
    ApiUserDataAdminService,
    ApiUserDataUserService,
  ],
  exports: [ApiUserService],
})
export class ApiUserDataAccessModule {}
