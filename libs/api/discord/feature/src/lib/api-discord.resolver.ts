import { ApiDiscordService } from '@deanslist-platform/api-discord-data-access'
import { Resolver } from '@nestjs/graphql'

@Resolver()
export class ApiDiscordResolver {
  constructor(private readonly service: ApiDiscordService) {}
}
