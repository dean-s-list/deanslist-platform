import { ApiCoreService, slugifyId } from '@deanslist-platform/api-core-data-access'
import { USERS_PROVISIONED } from '@deanslist-platform/api-user-data-access'
import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Prisma } from '@prisma/client'
import { ApiCommunityDataService } from './api-community-data.service'
import { provisionCommunities } from './api-community-provision-data'
import { COMMUNITIES_PROVISIONED } from './api-community.events'

@Injectable()
export class ApiCommunityProvisionService {
  private readonly logger = new Logger(ApiCommunityProvisionService.name)

  constructor(private readonly core: ApiCoreService, private readonly data: ApiCommunityDataService) {}

  @OnEvent(USERS_PROVISIONED)
  async onApplicationStarted() {
    if (this.core.config.databaseProvision) {
      await Promise.all(provisionCommunities.map((community) => this.provisionCommunity(community)))
      this.logger.verbose(`Provisioned communities`)
      this.core.event.emit(COMMUNITIES_PROVISIONED)
    }
  }

  private async provisionCommunity(input: Prisma.CommunityCreateInput) {
    const name = input.name.trim()
    const id = slugifyId(name, true)
    if (!(await this.core.data.community.findUnique({ where: { id } }))) {
      await this.data.createCommunity('alice', { ...input, id, name })
      this.logger.verbose(`Provisioned community ${input.name} `)
    }
  }
}
