import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { ApiCommunityDataAccessModule } from '@deanslist-platform/api-community-data-access'
import { Module } from '@nestjs/common'
import { ApiDiscordBotCommandService } from './api-discord-bot-command.service'
import { ApiDiscordBotService } from './api-discord-bot.service'
import { ApiDiscordChannelService } from './api-discord-channel.service'
import { ApiDiscordEventProjectService } from './api-discord-event-project.service'
import { ApiDiscordEventCommunityService } from './api-discord-event-community.service'
import { ApiDiscordService } from './api-discord.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiCommunityDataAccessModule],
  providers: [
    ApiDiscordBotCommandService,
    ApiDiscordBotService,
    ApiDiscordChannelService,
    ApiDiscordEventProjectService,
    ApiDiscordEventCommunityService,
    ApiDiscordService,
  ],
  exports: [ApiDiscordService],
})
export class ApiDiscordDataAccessModule {}
