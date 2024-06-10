import { ApiAuthDataAccessModule } from '@deanslist-platform/api-auth-data-access'
import { Module } from '@nestjs/common'
import { ApiAuthStrategyDiscordController } from './api-auth-strategy-discord.controller'
import { ApiAuthController } from './api-auth.controller'
import { ApiAuthResolver } from './api-auth.resolver'

@Module({
  controllers: [ApiAuthController, ApiAuthStrategyDiscordController],
  imports: [ApiAuthDataAccessModule],
  providers: [ApiAuthResolver],
})
export class ApiAuthFeatureModule {}
