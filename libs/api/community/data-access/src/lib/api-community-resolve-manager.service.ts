import { Injectable } from '@nestjs/common'
import { ApiCommunityDataService } from './api-community-data.service'
import { ManagerCreateCommunityInput } from './dto/manager-create-community.input'
import { ManagerFindManyCommunityInput } from './dto/manager-find-many-community.input'
import { ManagerUpdateCommunityInput } from './dto/manager-update-community.input'
import { CommunityPaging } from './entity/community-paging.entity'
import { getManagerCommunityWhereInput } from './helpers/get-manager-community-where.input'

@Injectable()
export class ApiCommunityResolveManagerService {
  constructor(private readonly data: ApiCommunityDataService) {}

  async addCommunityMember(userId: string, communityId: string, memberId: string) {
    await this.data.ensureCommunityAdmin({ communityId, userId })

    return this.data.addCommunityMember(userId, communityId, memberId)
  }

  async createCommunity(userId: string, input: ManagerCreateCommunityInput) {
    // Only admins can create communities
    await this.data.core.ensureUserRoleAdmin(userId)

    return this.data.createCommunity(userId, input)
  }

  async deleteCommunity(userId: string, communityId: string) {
    await this.data.ensureCommunityAdmin({ communityId, userId })

    return this.data.deleteCommunity(userId, communityId)
  }

  async getCommunityMembers(communityId: string) {
    return this.data.getCommunityMembers(communityId)
  }

  async getCommunityMember(userId: string, communityId: string) {
    return this.data.getCommunityMember({ userId, communityId })
  }

  async findManyCommunity(input: ManagerFindManyCommunityInput): Promise<CommunityPaging> {
    return this.data.findManyCommunity({
      orderBy: { createdAt: 'desc' },
      where: getManagerCommunityWhereInput(input),
      limit: input.limit ?? 10,
      page: input.page ?? 1,
      include: { members: true, projects: true },
    })
  }

  async findOneCommunity(communityId: string) {
    return this.data.findOneCommunity(communityId)
  }

  async updateCommunity(userId: string, communityId: string, input: ManagerUpdateCommunityInput) {
    await this.data.ensureCommunityAdmin({ communityId, userId })
    return this.data.updateCommunity(communityId, input)
  }

  async removeCommunityMember(userId: string, communityId: string, memberId: string) {
    await this.data.ensureCommunityAdmin({ communityId, userId })
    return this.data.removeCommunityMember(userId, communityId, memberId)
  }

  async toggleCommunityAdmin(userId: string, communityId: string, memberId: string) {
    await this.data.ensureCommunityAdmin({ communityId, userId })
    if (userId === memberId) {
      throw new Error('Cannot toggle self')
    }
    return this.data.toggleCommunityAdmin(userId, communityId, memberId)
  }
}
