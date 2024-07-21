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
      managers: input.managers ? input.managers : { create: { userId, admin: true } },
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
    const manager = await this.ensureCommunityManager({ communityId, userId })
    if (!manager.admin) {
      throw new Error('You are not a community admin')
    }
    return manager
  }

  async ensureCommunityManager({ communityId, userId }: { communityId: string; userId: string }) {
    const manager = await this.getCommunityManager({ communityId, userId })
    if (!manager) {
      throw new Error('You are not a community manager')
    }
    return manager
  }

  async getCommunityManager({ communityId, userId }: { communityId: string; userId: string }) {
    return this.core.data.communityManager.findUnique({
      where: { communityId_userId: { communityId, userId } },
      include: { user: true },
    })
  }

  async getCommunityManagers(communityId: string) {
    return this.core.data.communityManager.findMany({
      where: { communityId },
      include: { user: true },
      orderBy: [{ user: { username: 'asc' } }],
    })
  }

  async getCommunitiesForUser(userId: string) {
    return this.core.data.community.findMany({
      where: { managers: { some: { userId } } },
      orderBy: { name: 'asc' },
      include: {
        managers: { distinct: ['userId'] },
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

  async findOneCommunity(communityId: string, { userId }: { userId?: string } = {}) {
    const found = await this.core.data.community.findUnique({
      where: { id: communityId, managers: userId ? { some: { userId } } : undefined },
      include: { managers: true },
    })
    if (!found) {
      throw new Error('Community not found')
    }
    return found
  }

  async updateCommunity(communityId: string, input: AdminUpdateCommunityInput | ManagerUpdateCommunityInput) {
    return this.core.data.community.update({ where: { id: communityId }, data: input })
  }

  async removeCommunityManager(userId: string, communityId: string, managerId: string) {
    const manager = await this.getCommunityManager({ communityId, userId: managerId })
    if (!manager) {
      throw new Error('Manager not found')
    }
    if (manager.admin) {
      throw new Error('Cannot remove community admin')
    }
    const removed = await this.core.data.communityManager.delete({
      where: { communityId_userId: { communityId, userId: managerId } },
    })
    this.event.emitCommunityManagerRemoved({ userId, managerId, communityId })
    return !!removed
  }

  async addCommunityManager(userId: string, communityId: string, managerId: string) {
    const found = await this.getCommunityManager({ communityId, userId: managerId })
    if (found) {
      throw new Error('Manager already added')
    }
    const added = await this.core.data.communityManager.create({
      data: { communityId, userId: managerId },
    })
    this.event.emitCommunityManagerAdded({ userId, managerId, communityId })
    return !!added
  }

  async toggleCommunityAdmin(userId: string, communityId: string, managerId: string) {
    const manager = await this.getCommunityManager({ communityId, userId: managerId })
    if (!manager) {
      throw new Error('Manager not found')
    }
    const updated = await this.core.data.communityManager.update({
      where: { communityId_userId: { communityId, userId: managerId } },
      data: { admin: !manager.admin },
    })
    // TODO: emit event
    // this.event.emitCommunityManagerToggledAdmin({ userId, managerId, communityId })
    return !!updated
  }
}
