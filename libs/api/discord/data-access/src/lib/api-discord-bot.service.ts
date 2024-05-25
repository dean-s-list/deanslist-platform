import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { DiscordBot } from '@deanslist-platform/api-discord-util'
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common'
import { Collection, MessageCreateOptions, PermissionsBitField } from 'discord.js'
import { ApiDiscordBotCommandService } from './api-discord-bot-command.service'

import { DiscordServer } from './entity/discord-server.entity'

@Injectable()
export class ApiDiscordBotService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ApiDiscordBotService.name)
  private readonly permissions = new PermissionsBitField([
    PermissionsBitField.Flags.EmbedLinks,
    PermissionsBitField.Flags.ManageRoles,
    PermissionsBitField.Flags.ManageChannels,
    PermissionsBitField.Flags.SendMessages,
    PermissionsBitField.Flags.UseApplicationCommands,
  ])
  private readonly developmentServers = ['1187522687531233381', '1083213946078625853']

  private bot?: DiscordBot

  constructor(private readonly core: ApiCoreService, private readonly command: ApiDiscordBotCommandService) {}

  async onApplicationBootstrap() {
    if (!this.core.config.discordBotToken) {
      this.logger.verbose('Discord bot token not found, discord service disabled')
      return
    }
    this.bot = new DiscordBot({ token: this.core.config.discordBotToken })
    this.bot
      .start()
      .then(async () => {
        if (!this.bot?.client?.user) {
          this.logger.error('Bot started but client user is not available')
          return
        }
        await this.ensureConfiguration(this.bot.client.user.id, this.bot.client.user.username)
        await this.setupApplicationCommands()
        this.logger.verbose(`Bot started: ${this.bot?.client?.user?.username}`)
      })
      .catch((e) => {
        this.logger.error(`Failed to start bot`, e)
      })
  }

  async setupApplicationCommands() {
    if (!this.bot?.client?.application) {
      return
    }

    this.logger.verbose(`Setting up application commands`)
    const commands = this.command.commands()

    for (const serverId of this.developmentServers) {
      this.logger.verbose(`Registering application commands in guild ${serverId}`)
      await this.bot.client.application.commands
        .set(
          commands.map((c) => c.data.toJSON()),
          serverId,
        )
        .then((res) => {
          this.logger.verbose(`Registered application commands in guild ${serverId}: ${res}`)
        })
        .catch((error) => {
          this.logger.error(
            `Failed to register application commands (${serverId ? `in guild ${serverId}` : 'global'}): ${error}`,
            error.stack,
          )
        })
    }

    this.logger.verbose(`Registering application commands globally`)
    await this.bot.client.application.commands
      .set(commands.map((c) => c.data.toJSON()))
      .then((res) => {
        this.logger.verbose(`Registered application commands globally: ${res}`)
      })
      .catch((error) => {
        this.logger.error(`Failed to register application commands globally: ${error}`, error.stack)
      })

    const client = this.bot.client
    client.commands = new Collection()
    for (const command of commands) {
      client.commands.set(command.data.name, command)
    }

    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return

      const command = client.commands?.get(interaction.commandName)

      if (!command) return

      try {
        await command.execute(interaction)
      } catch (error) {
        this.logger.error(error)
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
      }
    })
  }

  inviteUrl(botId: string) {
    const url = new URL('https://discord.com/api/oauth2/authorize')
    url.searchParams.append('client_id', botId)
    url.searchParams.append('permissions', this.permissions.bitfield.toString())
    url.searchParams.append('scope', ' bot role_connections.write')
    url.searchParams.append('redirect_uri', this.core.config.authDiscordStrategyOptions.callbackURL)
    url.searchParams.append('response_type', 'code')

    return url.toString()
  }

  getBot() {
    if (!this.bot || !this.bot.client?.user) {
      throw new Error('Discord bot not started')
    }

    return {
      id: this.bot.client?.user.id,
      username: this.bot.client?.user.username,
      avatarUrl: this.bot.client?.user.avatarURL(),
      inviteUrl: this.inviteUrl(this.bot.client?.user.id),
      manageUrl: `https://discord.com/developers/applications/${this.bot.client.user.id}`,
    }
  }

  async getRoles(serverId: string) {
    if (!this.bot) {
      throw new Error('Discord bot not started')
    }

    return this.bot.getRoles(serverId)
  }

  getChannels(serverId: string) {
    if (!this.bot) {
      throw new Error('Discord bot not started')
    }

    return this.bot.getChannels(serverId)
  }

  getServers() {
    if (!this.bot) {
      throw new Error('Discord bot not started')
    }
    return this.bot.getServers()
  }

  private async ensureConfiguration(id: string, username: string) {
    await this.ensureDiscordBot(id, username)
    await this.ensureDiscordServers()
  }

  private async ensureDiscordBot(id: string, username: string) {
    const found = await this.core.data.discordBot.findUnique({ where: { id } })
    if (found) {
      return found
    }
    this.logger.verbose(`Creating DiscordBot object for ${username} [${id}]`)
    return await this.core.data.discordBot.create({ data: { id } })
  }
  private async ensureDiscordServers() {
    const servers = await this.getServers()
    for (const server of servers) {
      await this.ensureDiscordServer(server)
    }
  }

  private async ensureDiscordServer(server: DiscordServer) {
    const found = await this.core.data.discordServer.findUnique({ where: { id: server.id } })
    if (found) {
      return found
    }
    this.logger.verbose(`Creating DiscordServer object for ${server.name} [${server.id}]`)
    return await this.core.data.discordServer.create({
      data: {
        id: server.id,
      },
    })
  }

  async pingChannel({
    channelId,
    discordUserId,
    serverId,
  }: {
    discordUserId: string
    serverId: string
    channelId: string
  }) {
    if (!this.bot) {
      throw new Error('Discord bot not started')
    }

    return this.bot.pingChannel({ discordUserId, serverId, channelId })
  }

  leaveServer(serverId: string) {
    if (!this.bot) {
      throw new Error('Discord bot not started')
    }
    return this.bot.leaveServer(serverId)
  }

  getChannelsByIds(ids: string[]) {
    if (!this.bot) {
      throw new Error('Discord bot not started')
    }
    return this.bot.getChannelsByIds(ids)
  }

  async getChannel(channelId: string) {
    if (!this.bot) {
      throw new Error('Discord bot not started')
    }
    return this.bot.getChannel(channelId)
  }

  async sendMessage(channelId: string, message: string | MessageCreateOptions) {
    if (!this.bot) {
      throw new Error('Discord bot not started')
    }
    return this.bot.sendChannel(channelId, message)
  }

  hasServerAccess(serverId: string) {
    if (!this.bot) {
      throw new Error('Discord bot not started')
    }
    return this.bot.hasServerAccess(serverId)
  }

  async getServer(serverId: string) {
    if (!this.bot) {
      throw new Error('Discord bot not started')
    }
    const servers = await this.bot.getServers()

    return servers.find((s) => s.id === serverId)
  }

  async createTextChannel({
    name,
    topic,
    serverId,
    parentId,
  }: {
    name: string
    topic: string
    serverId: string
    parentId: string
  }) {
    if (!this.bot) {
      throw new Error('Discord bot not started')
    }
    return this.bot.createTextChannel({ name, topic, serverId, parentId })
  }
}
