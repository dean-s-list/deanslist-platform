import { ApiProjectDataAccessModule } from '@deanslist-platform/api-project-data-access'
import { Module } from '@nestjs/common'
import { ApiProjectAdminResolver } from './api-project-admin.resolver'
import { ApiProjectManagementResolver } from './api-project-management.resolver'
import { ApiProjectUserResolver } from './api-project-user.resolver'
import { ApiProjectResolver } from './api-project.resolver'

@Module({
  imports: [ApiProjectDataAccessModule],
  providers: [ApiProjectResolver, ApiProjectManagementResolver, ApiProjectUserResolver, ApiProjectAdminResolver],
})
export class ApiProjectFeatureModule {}
