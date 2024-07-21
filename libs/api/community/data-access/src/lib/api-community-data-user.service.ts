import { Injectable } from '@nestjs/common'
import { ApiCommunityDataService } from './api-community-data.service'
import { ManagerCreateCommunityInput } from './dto/manager-create-community.input'
import { ManagerFindManyCommunityInput } from './dto/manager-find-many-community.input'
import { ManagerUpdateCommunityInput } from './dto/manager-update-community.input'
import { CommunityPaging } from './entity/community-paging.entity'
import { getUserCommunityWhereInput } from './helpers/get-user-community-where.input'

@Injectable()
export class ApiCommunityDataUserService {
  constructor(private readonly data: ApiCommunityDataService) {}
  async addCommunityManager(userId: string, communityId: string, managerId: string) {
    await this.data.ensureCommunityAdmin({ communityId, userId })
    return this.data.addCommunityManager(userId, communityId, managerId)
  }

  async createCommunity(userId: string, input: ManagerCreateCommunityInput) {
    await this.data.core.ensureUserRoleAdmin(userId)
    return this.data.createCommunity(userId, input)
  }

  async deleteCommunity(userId: string, communityId: string) {
    await this.data.ensureCommunityAdmin({ communityId, userId })
    return this.data.deleteCommunity(userId, communityId)
  }

  async getCommunityManagers(communityId: string) {
    return this.data.getCommunityManagers(communityId)
  }

  async getCommunityManager(userId: string, communityId: string) {
    return this.data.getCommunityManager({ userId, communityId })
  }

  async findManyCommunity(input: ManagerFindManyCommunityInput): Promise<CommunityPaging> {
    return this.data.findManyCommunity({
      orderBy: { name: 'asc' },
      where: getUserCommunityWhereInput(input),
      limit: input.limit ?? 10,
      page: input.page ?? 1,
      include: { managers: true, projects: true },
    })
  }

  async findOneCommunity(communityId: string) {
    return this.data.findOneCommunity(communityId)
  }

  async updateCommunity(userId: string, communityId: string, input: ManagerUpdateCommunityInput) {
    await this.data.ensureCommunityAdmin({ communityId, userId })
    return this.data.updateCommunity(communityId, input)
  }

  async removeCommunityManager(userId: string, communityId: string, managerId: string) {
    await this.data.ensureCommunityAdmin({ communityId, userId })
    return this.data.removeCommunityManager(userId, communityId, managerId)
  }

  async toggleCommunityAdmin(userId: string, communityId: string, managerId: string) {
    await this.data.ensureCommunityAdmin({ communityId, userId })
    if (userId === managerId) {
      throw new Error('Cannot toggle self')
    }
    return this.data.toggleCommunityAdmin(userId, communityId, managerId)
  }
}
