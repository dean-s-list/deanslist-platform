import { ApiDiscordDataAccessModule } from '@deanslist-platform/api-discord-data-access'
import { Module } from '@nestjs/common'
import { ApiDiscordAdminResolver } from './api-discord-admin.resolver'
import { ApiDiscordUserResolver } from './api-discord-user.resolver'
import { ApiDiscordResolver } from './api-discord.resolver'

@Module({
  imports: [ApiDiscordDataAccessModule],
  providers: [ApiDiscordAdminResolver, ApiDiscordResolver, ApiDiscordUserResolver],
})
export class ApiDiscordFeatureModule {}
