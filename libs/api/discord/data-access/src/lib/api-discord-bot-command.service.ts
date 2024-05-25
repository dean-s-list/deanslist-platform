import { ApiCoreService, createIdentityProviderCache } from '@deanslist-platform/api-core-data-access'
import { ApiTeamService, createTeamEmbed } from '@deanslist-platform/api-team-data-access'
import { Injectable } from '@nestjs/common'
import { IdentityProvider } from '@prisma/client'
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import {
  createIdentityEmbed,
  createProjectEmbed,
  createUserEmbed,
  onboardUserEmbeds,
} from './helpers/discord-embed-helpers'

@Injectable()
export class ApiDiscordBotCommandService {
  private readonly baseUrl = this.core.config.webUrl
  private readonly discordIdentityCache = createIdentityProviderCache({
    data: this.core.data,
    max: 1000,
    provider: IdentityProvider.Discord,
  })

  constructor(private readonly core: ApiCoreService, private readonly team: ApiTeamService) {}

  commands(): {
    data: SlashCommandBuilder
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>
  }[] {
    return [
      {
        data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
        execute: async (interaction) => {
          await interaction.reply('Pong!')
        },
      },
      {
        data: new SlashCommandBuilder().setName('channel').setDescription('Get information about the channel'),
        execute: async (interaction) => {
          const identity = await this.ensureUserIdentity(interaction)
          if (!identity) {
            return
          }
          // Get channel info
          const channel = interaction.channel?.id

          const found = await this.core.data.discordChannel.findUnique({
            where: { id: channel },
            include: { projects: true, teams: { include: { members: true, projects: true } } },
          })
          if (!found) {
            await interaction.reply({ ephemeral: true, content: `Channel <#${channel}> is not configured` })
            return
          }

          const hasTeam = found.teams.length > 0
          const hasProject = found.projects.length > 0

          if (!hasTeam && !hasProject) {
            await interaction.reply({
              ephemeral: true,
              content: `Channel <#${channel}> is not connected to a team or project`,
            })
            return
          }
          if (hasTeam && found.teams.length) {
            await interaction.reply({
              ephemeral: true,
              content: `Channel <#${channel}> is connected to team <#${found.teams[0].name}>`,
              embeds: [createTeamEmbed(this.baseUrl, found.teams[0])],
            })
            return
          }
          if (hasProject && found.projects.length) {
            await interaction.reply({
              ephemeral: true,
              content: `Channel <#${channel}> is connected to project <#${found.projects[0].name}>`,
              embeds: [createProjectEmbed(this.baseUrl, found.projects[0])],
            })
            return
          }
        },
      },
      {
        data: new SlashCommandBuilder().setName('whoami').setDescription('Get information about yourself'),
        execute: async (interaction) => {
          const identity = await this.ensureUserIdentity(interaction)
          if (!identity) {
            return
          }
          await interaction.reply({
            ephemeral: true,
            embeds: [createUserEmbed(identity), createIdentityEmbed(identity)],
          })
        },
      },
      {
        data: new SlashCommandBuilder().setName('teams').setDescription('Get a list of teams'),
        execute: async (interaction) => {
          const identity = await this.ensureUserIdentity(interaction)
          if (!identity) {
            return
          }
          const teams = await this.team.data.getTeamsForUser(identity.owner.id)
          await interaction.reply({ ephemeral: true, embeds: teams.map((team) => createTeamEmbed(this.baseUrl, team)) })
        },
      },
    ]
  }

  private async ensureUserIdentity(interaction: ChatInputCommandInteraction) {
    const item = await this.discordIdentityCache.fetch(interaction.user.id)
    if (!item?.owner) {
      await interaction.reply({ ephemeral: true, embeds: onboardUserEmbeds(this.baseUrl, interaction.user.id) })
      return undefined
    }
    return item
  }
}
