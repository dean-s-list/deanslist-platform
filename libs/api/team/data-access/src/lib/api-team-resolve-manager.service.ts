import { Injectable } from '@nestjs/common'
import { ApiTeamDataService } from './api-team-data.service'
import { ManagerCreateTeamInput } from './dto/manager-create-team.input'
import { ManagerFindManyTeamInput } from './dto/manager-find-many-team.input'
import { ManagerUpdateTeamInput } from './dto/manager-update-team.input'
import { TeamPaging } from './entity/team-paging.entity'
import { getManagerTeamWhereInput } from './helpers/get-manager-team-where.input'

@Injectable()
export class ApiTeamResolveManagerService {
  constructor(private readonly data: ApiTeamDataService) {}

  async addTeamMember(userId: string, teamId: string, memberId: string) {
    await this.data.ensureTeamAdmin({ teamId, userId })

    return this.data.addTeamMember(userId, teamId, memberId)
  }

  async createTeam(userId: string, input: ManagerCreateTeamInput) {
    // Only admins can create teams
    await this.data.core.ensureUserRoleAdmin(userId)

    return this.data.createTeam(userId, input)
  }

  async deleteTeam(userId: string, teamId: string) {
    await this.data.ensureTeamAdmin({ teamId, userId })

    return this.data.deleteTeam(userId, teamId)
  }

  async getTeamMembers(teamId: string) {
    return this.data.getTeamMembers(teamId)
  }

  async getTeamMember(userId: string, teamId: string) {
    return this.data.getTeamMember({ userId, teamId })
  }

  async findManyTeam(input: ManagerFindManyTeamInput): Promise<TeamPaging> {
    return this.data.findManyTeam({
      orderBy: { createdAt: 'desc' },
      where: getManagerTeamWhereInput(input),
      limit: input.limit ?? 10,
      page: input.page ?? 1,
      include: { members: true, projects: true },
    })
  }

  async findOneTeam(teamId: string) {
    return this.data.findOneTeam(teamId)
  }

  async updateTeam(userId: string, teamId: string, input: ManagerUpdateTeamInput) {
    await this.data.ensureTeamAdmin({ teamId, userId })
    return this.data.updateTeam(teamId, input)
  }

  async removeTeamMember(userId: string, teamId: string, memberId: string) {
    await this.data.ensureTeamAdmin({ teamId, userId })
    return this.data.removeTeamMember(userId, teamId, memberId)
  }

  async toggleTeamAdmin(userId: string, teamId: string, memberId: string) {
    await this.data.ensureTeamAdmin({ teamId, userId })
    if (userId === memberId) {
      throw new Error('Cannot toggle self')
    }
    return this.data.toggleTeamAdmin(userId, teamId, memberId)
  }
}
