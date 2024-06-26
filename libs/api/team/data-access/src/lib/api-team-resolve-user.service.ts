import { Injectable } from '@nestjs/common'
import { ApiTeamDataService } from './api-team-data.service'
import { UserCreateTeamInput } from './dto/user-create-team.input'
import { UserFindManyTeamInput } from './dto/user-find-many-team.input'
import { UserUpdateTeamInput } from './dto/user-update-team.input'
import { TeamPaging } from './entity/team-paging.entity'
import { getUserTeamWhereInput } from './helpers/get-user-team-where.input'

@Injectable()
export class ApiTeamResolveUserService {
  constructor(private readonly data: ApiTeamDataService) {}
  async addTeamMember(userId: string, teamId: string, memberId: string) {
    await this.data.ensureTeamAdmin({ teamId, userId })
    return this.data.addTeamMember(userId, teamId, memberId)
  }

  async createTeam(userId: string, input: UserCreateTeamInput) {
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

  async findManyTeam(input: UserFindManyTeamInput): Promise<TeamPaging> {
    return this.data.findManyTeam({
      orderBy: { createdAt: 'desc' },
      where: getUserTeamWhereInput(input),
      limit: input.limit ?? 10,
      page: input.page ?? 1,
      include: { members: true, projects: true },
    })
  }

  async findOneTeam(teamId: string) {
    return this.data.findOneTeam(teamId)
  }

  async updateTeam(userId: string, teamId: string, input: UserUpdateTeamInput) {
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
