import { ApiProjectDataAccessModule } from '@deanslist-platform/api-project-data-access'
import { Module } from '@nestjs/common'
import { ApiProjectAdminResolver } from './api-project-admin.resolver'
import { ApiProjectManagerResolver } from './api-project-manager-resolver'
import { ApiProjectMemberManagerResolver } from './api-project-member-manager-resolver'
import { ApiProjectMemberResolver } from './api-project-member.resolver'
import { ApiProjectReviewerResolver } from './api-project-reviewer.resolver'
import { ApiProjectResolver } from './api-project.resolver'

@Module({
  imports: [ApiProjectDataAccessModule],
  providers: [
    ApiProjectResolver,
    ApiProjectManagerResolver,
    ApiProjectMemberManagerResolver,
    ApiProjectMemberResolver,
    ApiProjectReviewerResolver,
    ApiProjectAdminResolver,
  ],
})
export class ApiProjectFeatureModule {}
