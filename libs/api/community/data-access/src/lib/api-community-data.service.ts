import { ApiCoreService, slugifyId } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCommunityEventService } from './api-community-event.service'
import { AdminUpdateCommunityInput } from './dto/admin-update-community.input'
import { ManagerUpdateCommunityInput } from './dto/manager-update-community.input'
import { CommunityPaging } from './entity/community-paging.entity'
import { CommunityCreatedEvent } from './event/community-created-event'

@Injectable()
export class ApiCommunityDataService {
  constructor(readonly core: ApiCoreService, private readonly event: ApiCommunityEventService) {}

  async createCommunity(
    userId: string,
    { ...input }: Prisma.CommunityCreateInput,
  ): Promise<CommunityCreatedEvent['community']> {
    const name = input.name.trim()
    const id = slugifyId(name, true)

    const [foundId, foundName] = await Promise.all([
      this.core.data.community.findUnique({ where: { id } }),
      this.core.data.community.findFirst({ where: { name } }),
    ])

    if (foundName) {
      throw new Error('Community with this name already exists')
    }
    if (foundId) {
      throw new Error('Community with this id already exists')
    }

    const data: Prisma.CommunityCreateInput = {
      ...input,
      id,
      members: { create: { userId, admin: true } },
    }

    const community = await this.core.data.community.create({ data })

    this.event.emitCommunityCreated({ community, userId })

    return community
  }

  async deleteCommunity(userId: string, communityId: string) {
    const found = await this.findOneCommunity(communityId)

    const community = await this.core.data.community.delete({
      where: { id: found.id },
      include: {
        channels: true,
      },
    })

    this.event.emitCommunityDeleted({ community, userId })
    return !!community
  }

  async ensureCommunityAdmin({ communityId, userId }: { communityId: string; userId: string }) {
    const member = await this.getCommunityMember({ communityId, userId })
    if (!member || !member.admin) {
      throw new Error('You are not a community admin')
    }
    return member
  }

  async getCommunityMember({ communityId, userId }: { communityId: string; userId: string }) {
    return this.core.data.communityMember.findUnique({
      where: { communityId_userId: { communityId, userId } },
      include: { user: true },
    })
  }

  async getCommunityMembers(communityId: string) {
    return this.core.data.communityMember.findMany({
      where: { communityId },
      include: { user: true },
      orderBy: [{ user: { username: 'asc' } }],
    })
  }

  async getCommunitiesForUser(userId: string) {
    return this.core.data.community.findMany({
      where: { members: { some: { userId } } },
      orderBy: { name: 'asc' },
      include: {
        members: { distinct: ['userId'] },
        projects: { include: { _count: true } },
      },
    })
  }

  async findManyCommunity({
    limit,
    page,
    ...args
  }: Prisma.CommunityFindManyArgs & { limit: number; page: number }): Promise<CommunityPaging> {
    return this.core.data.community
      .paginate(args)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneCommunity(communityId: string) {
    const found = await this.core.data.community.findUnique({
      where: { id: communityId },
      include: { members: true },
    })
    if (!found) {
      throw new Error('Community not found')
    }
    return found
  }

  async updateCommunity(communityId: string, input: AdminUpdateCommunityInput | ManagerUpdateCommunityInput) {
    return this.core.data.community.update({ where: { id: communityId }, data: input })
  }

  async removeCommunityMember(userId: string, communityId: string, memberId: string) {
    const member = await this.getCommunityMember({ communityId, userId: memberId })
    if (!member) {
      throw new Error('Member not found')
    }
    if (member.admin) {
      throw new Error('Cannot remove community admin')
    }
    const removed = await this.core.data.communityMember.delete({
      where: { communityId_userId: { communityId, userId: memberId } },
    })
    this.event.emitCommunityMemberRemoved({ userId, memberId, communityId })
    return !!removed
  }

  async addCommunityMember(userId: string, communityId: string, memberId: string) {
    const found = await this.getCommunityMember({ communityId, userId: memberId })
    if (found) {
      throw new Error('Member already added')
    }
    const added = await this.core.data.communityMember.create({
      data: { communityId, userId: memberId },
    })
    this.event.emitCommunityMemberAdded({ userId, memberId, communityId })
    return !!added
  }

  async toggleCommunityAdmin(userId: string, communityId: string, memberId: string) {
    const member = await this.getCommunityMember({ communityId, userId: memberId })
    if (!member) {
      throw new Error('Member not found')
    }
    const updated = await this.core.data.communityMember.update({
      where: { communityId_userId: { communityId, userId: memberId } },
      data: { admin: !member.admin },
    })
    // TODO: emit event
    // this.event.emitCommunityMemberToggledAdmin({ userId, memberId, communityId })
    return !!updated
  }
}
