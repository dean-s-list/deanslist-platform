import { ApiAuthFeatureModule } from '@deanslist-platform/api-auth-feature'
import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { ApiDiscordFeatureModule } from '@deanslist-platform/api-discord-feature'
import { ApiIdentityFeatureModule } from '@deanslist-platform/api-identity-feature'
import { ApiProjectFeatureModule } from '@deanslist-platform/api-project-feature'
import { ApiCommentFeatureModule } from '@deanslist-platform/api-comment-feature'
import { ApiRatingFeatureModule } from '@deanslist-platform/api-rating-feature'
import { ApiReviewFeatureModule } from '@deanslist-platform/api-review-feature'
import { ApiTeamFeatureModule } from '@deanslist-platform/api-team-feature'
import { ApiUserFeatureModule } from '@deanslist-platform/api-user-feature'
import { Module } from '@nestjs/common'
import { ApiCoreController } from './api-core.controller'
import { ApiCoreResolver } from './api-core.resolver'

const imports = [
  // The api-feature generator will add the imports here
  ApiAuthFeatureModule,
  ApiCoreDataAccessModule,
  ApiDiscordFeatureModule,
  ApiIdentityFeatureModule,
  ApiProjectFeatureModule,
  ApiCommentFeatureModule,
  ApiRatingFeatureModule,
  ApiReviewFeatureModule,
  ApiTeamFeatureModule,
  ApiUserFeatureModule,
]

@Module({
  controllers: [ApiCoreController],
  imports: [...imports],
  providers: [ApiCoreResolver],
})
export class ApiCoreFeatureModule {}
