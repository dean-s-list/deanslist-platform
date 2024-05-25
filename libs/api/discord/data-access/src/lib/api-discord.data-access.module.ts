import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { ApiTeamDataAccessModule } from '@deanslist-platform/api-team-data-access'
import { Module } from '@nestjs/common'
import { ApiDiscordBotCommandService } from './api-discord-bot-command.service'
import { ApiDiscordBotService } from './api-discord-bot.service'
import { ApiDiscordChannelService } from './api-discord-channel.service'
import { ApiDiscordEventProjectService } from './api-discord-event-project.service'
import { ApiDiscordEventTeamService } from './api-discord-event-team.service'
import { ApiDiscordService } from './api-discord.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiTeamDataAccessModule],
  providers: [
    ApiDiscordBotCommandService,
    ApiDiscordBotService,
    ApiDiscordChannelService,
    ApiDiscordEventProjectService,
    ApiDiscordEventTeamService,
    ApiDiscordService,
  ],
  exports: [ApiDiscordService],
})
export class ApiDiscordDataAccessModule {}
