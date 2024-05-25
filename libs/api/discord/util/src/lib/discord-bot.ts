import { REST } from '@discordjs/rest'
import { Logger } from '@nestjs/common'
import {
  ChannelType,
  Client,
  Collection,
  Guild,
  GuildMember,
  MessageCreateOptions,
  NonThreadGuildBasedChannel,
  PermissionsString,
} from 'discord.js'
import { createDiscordClient } from './discord/client'

export interface RESTDiscordRoleConnection {
  type: number
  name: string
  description: string
  key: string
}

export interface RESTDiscordRole {
  id: string
  name: string
  color: number
  managed: boolean
  position: number
}

export interface RESTDiscordMember {
  id: string
  providerId: string
  username: string
}

export class DiscordBot {
  private readonly logger = new Logger(DiscordBot.name)
  client?: Client & { commands?: Collection<string, any> }
  rest?: REST
  constructor(private readonly config: { token: string }) {}

  async start() {
    this.logger.verbose(`Starting bot...`)
    this.client = await createDiscordClient(this.config.token)
    this.rest = new REST({ version: '10' }).setToken(this.config.token)
    this.logger.verbose(`Bot started`)
  }

  async stop() {
    this.logger.verbose(`Stopping bot...`)
    await this.client?.destroy()
    this.logger.verbose(`Bot stopped`)
  }

  async getDiscordServerMembers(guildId: string) {
    const guild = await this.getServer(guildId)
    if (!guild) {
      throw new Error(`Could not fetch guild with id ${guildId}`)
    }

    const members = await this.getEachMember(guild)
    return members.map((member) => ({ memberId: member.id, roleIds: member.roles.cache.map((role) => role.id) }))
  }

  async getDiscordServerChannels(guildId: string) {
    const guild = await this.getServer(guildId)
    if (!guild) {
      throw new Error(`Could not fetch guild with id ${guildId}`)
    }

    return guild.channels.fetch().then((res) => res.map((channel) => channel as NonThreadGuildBasedChannel))
  }

  private async getEachMember(guild: Guild): Promise<GuildMember[]> {
    const limit = 1000
    const result: GuildMember[] = []
    let after: string | undefined
    let batches = 0
    let count = 0
    let done = false

    while (!done) {
      const members = await guild.members.list({ limit, after })

      if (members.size === 0) {
        done = true
        break
      }

      batches++
      result.push(...members.values())
      after = members.last()?.id
      count += members.size
    }

    this.logger.verbose(
      `[${this.client?.user?.username}] getEachMember(${guild.name}): found ${count} members in ${batches} batches`,
    )

    return result
  }

  async getMembers(serverId: string): Promise<RESTDiscordMember[]> {
    const server = await this.getServer(serverId)
    const members = await server?.members.fetch()
    const summary =
      members?.map((members) => ({
        id: members.id,
        providerId: members.user.id,
        username: members.user.username,
      })) ?? []

    return summary.sort((a, b) => b.username.localeCompare(a.username))
  }

  async getRole(serverId: string, roleId: string): Promise<RESTDiscordRole | undefined> {
    return this.getRoles(serverId).then((roles) => roles.find((role) => role.id === roleId))
  }

  async getRoles(serverId: string): Promise<RESTDiscordRole[]> {
    const server = await this.getServer(serverId)
    const roles = await server?.roles.fetch()
    const summary =
      roles?.map((role) => ({
        id: role.id,
        name: role.name,
        color: role.color,
        managed: role.managed,
        position: role.position,
      })) ?? []

    return summary.sort((a, b) => b.position - a.position)
  }

  async getServer(serverId: string) {
    return await this.client?.guilds.fetch({ guild: serverId })
  }

  async leaveServer(serverId: string) {
    const server = await this.client?.guilds.fetch({ guild: serverId })
    if (!server) {
      throw new Error(`Server ${serverId} not found`)
    }

    const result = await server.leave()
    this.logger.verbose(`Bot ${this.client?.user?.username} left server ${result.name}`)
    return true
  }

  async sendChannel(channelId: string, content: string | MessageCreateOptions) {
    const channel = this.ensureDiscordServerChannel(channelId)
    if (channel.isTextBased()) {
      if (typeof content == 'string') {
        await channel.send({ content })
      } else {
        await channel.send(content)
      }
    } else {
      throw new Error('Channel not text based')
    }
  }

  ensureDiscordServerChannel(channelId: string) {
    const found = this.client?.channels.cache.get(channelId)

    if (!found) {
      throw new Error('Channel not found')
    }
    return found
  }

  getChannels(serverId: string) {
    return this.client?.guilds.cache
      .get(serverId)
      ?.channels.cache.map((channel) => channel as NonThreadGuildBasedChannel)
      .map((channel) => ({
        id: channel.id,
        name: channel.name,
        parentId: channel.parentId,
        guildId: channel.guild.id,
        type: ChannelType[channel.type],
      }))
  }

  async getServers() {
    const servers = await this.client?.guilds.fetch()
    if (!servers) {
      return []
    }

    return servers.map((server) => ({
      id: server.id,
      name: server.name,
      avatarUrl: server.iconURL(),
      permissions: convertPermissions(server.permissions.serialize()),
    }))
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
    const member = await this.client?.guilds.cache.get(serverId)?.members.fetch(discordUserId)
    if (!member) {
      throw new Error(`Member ${discordUserId} not found in server ${serverId}`)
    }
    const channel = this.client?.channels.cache.get(channelId)
    if (!channel) {
      throw new Error(`Channel ${channelId} not found`)
    }
    if (channel.isTextBased() && channel.type === ChannelType.GuildText) {
      return await channel.send({ content: `ping <@${member.id}>` })
    }

    throw new Error('Channel not text based')
  }

  getChannelsByIds(ids: string[]) {
    return this.client?.guilds.cache
      .map((guild) => guild.id)
      .map((guildId) => this.getChannels(guildId))
      .flat()
      .filter((channel) => ids.includes(channel ? channel.id : ''))
  }

  getChannel(channelId: string) {
    return this.client?.channels.cache.get(channelId)
  }

  hasServerAccess(serverId: string) {
    return this.client?.guilds.cache.has(serverId)
  }

  async createTextChannel({
    name,
    topic,
    parentId,
    serverId,
  }: {
    name: string
    topic: string
    serverId: string
    parentId: string
  }) {
    const server = this.client?.guilds.cache.get(serverId)
    if (!server) {
      throw new Error(`Server ${serverId} not found`)
    }

    const parent = server.channels.cache.get(parentId)
    if (!parent) {
      throw new Error(`Parent channel ${parentId} not found in server ${serverId}`)
    }

    const created = await server.channels.create({ name, type: ChannelType.GuildText, parent: parent.id, topic })
    if (!created) {
      throw new Error(`Could not create channel ${name} in server ${serverId}`)
    }
    return created
  }
}

function convertPermissions(permissions: Record<PermissionsString, boolean>) {
  return (Object.keys(permissions) as PermissionsString[]).filter((key) => permissions[key] === true)
}
