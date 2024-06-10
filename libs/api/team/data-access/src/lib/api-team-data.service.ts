import { ApiCoreService, slugifyId } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiTeamEventService } from './api-team-event.service'
import { AdminUpdateTeamInput } from './dto/admin-update-team.input'
import { UserUpdateTeamInput } from './dto/user-update-team.input'
import { TeamPaging } from './entity/team-paging.entity'
import { TeamCreatedEvent } from './event/team-created-event'

@Injectable()
export class ApiTeamDataService {
  constructor(readonly core: ApiCoreService, private readonly event: ApiTeamEventService) {}

  async createTeam(userId: string, { ...input }: Prisma.TeamCreateInput): Promise<TeamCreatedEvent['team']> {
    const name = input.name.trim()
    const id = slugifyId(name, true)

    const [foundId, foundName] = await Promise.all([
      this.core.data.team.findUnique({ where: { id } }),
      this.core.data.team.findFirst({ where: { name } }),
    ])

    if (foundName) {
      throw new Error('Team with this name already exists')
    }
    if (foundId) {
      throw new Error('Team with this id already exists')
    }

    const data: Prisma.TeamCreateInput = {
      ...input,
      id,
      members: { create: { userId, admin: true } },
    }

    const team = await this.core.data.team.create({ data })

    this.event.emitTeamCreated({ team, userId })

    return team
  }

  async deleteTeam(userId: string, teamId: string) {
    const found = await this.findOneTeam(teamId)

    const team = await this.core.data.team.delete({
      where: { id: found.id },
      include: {
        channels: true,
      },
    })

    this.event.emitTeamDeleted({ team, userId })
    return !!team
  }

  async ensureTeamAdmin({ teamId, userId }: { teamId: string; userId: string }) {
    const member = await this.getTeamMember({ teamId, userId })
    if (!member || !member.admin) {
      throw new Error('You are not a team admin')
    }
    return member
  }
  async getTeamMember({ teamId, userId }: { teamId: string; userId: string }) {
    return this.core.data.teamMember.findUnique({
      where: { teamId_userId: { teamId, userId } },
      include: { user: true },
    })
  }
  async getTeamMembers(teamId: string) {
    return this.core.data.teamMember.findMany({
      where: { teamId },
      include: { user: true },
      orderBy: [{ admin: 'desc' }, { user: { username: 'asc' } }],
    })
  }

  async getTeamsForUser(userId: string) {
    return await this.core.data.team.findMany({
      where: { members: { some: { userId } } },
      orderBy: { name: 'asc' },
      include: {
        members: { distinct: ['userId'] },
        projects: { include: { _count: true } },
      },
    })
  }

  async findManyTeam({
    limit,
    page,
    ...args
  }: Prisma.TeamFindManyArgs & { limit: number; page: number }): Promise<TeamPaging> {
    return this.core.data.team
      .paginate(args)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneTeam(teamId: string) {
    const found = await this.core.data.team.findUnique({
      where: { id: teamId },
    })
    if (!found) {
      throw new Error('Team not found')
    }
    return found
  }

  async updateTeam(teamId: string, input: AdminUpdateTeamInput | UserUpdateTeamInput) {
    return this.core.data.team.update({ where: { id: teamId }, data: input })
  }

  async removeTeamMember(userId: string, teamId: string, memberId: string) {
    const member = await this.getTeamMember({ teamId, userId: memberId })
    if (!member) {
      throw new Error('Member not found')
    }
    if (member.admin) {
      throw new Error('Cannot remove team admin')
    }
    const removed = await this.core.data.teamMember.delete({
      where: { teamId_userId: { teamId, userId: memberId } },
    })
    this.event.emitTeamMemberRemoved({ userId, memberId, teamId })
    return !!removed
  }

  async addTeamMember(userId: string, teamId: string, memberId: string) {
    const found = await this.getTeamMember({ teamId, userId: memberId })
    if (found) {
      throw new Error('Member already added')
    }
    const added = await this.core.data.teamMember.create({
      data: { teamId, userId: memberId },
    })
    this.event.emitTeamMemberAdded({ userId, memberId, teamId })
    return !!added
  }

  async toggleTeamAdmin(userId: string, teamId: string, memberId: string) {
    const member = await this.getTeamMember({ teamId, userId: memberId })
    if (!member) {
      throw new Error('Member not found')
    }
    const updated = await this.core.data.teamMember.update({
      where: { teamId_userId: { teamId, userId: memberId } },
      data: { admin: !member.admin },
    })
    // TODO: emit event
    // this.event.emitTeamMemberToggledAdmin({ userId, memberId, teamId })
    return !!updated
  }
}
