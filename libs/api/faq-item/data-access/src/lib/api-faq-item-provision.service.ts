import { COMMUNITIES_PROVISIONED } from '@deanslist-platform/api-community-data-access'
import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { ApiFaqItemDataService } from './api-faq-item-data.service'
import { ProjectProvisionInput, provisionItems } from './api-faq-item-provision-data'

@Injectable()
export class ApiFaqItemProvisionService {
  private readonly logger = new Logger(ApiFaqItemProvisionService.name)

  constructor(private readonly core: ApiCoreService, private readonly data: ApiFaqItemDataService) {}

  @OnEvent(COMMUNITIES_PROVISIONED)
  async onApplicationStarted() {
    if (this.core.config.databaseProvision) {
      await Promise.all(provisionItems.map((project) => this.provisionProject(project)))
      this.logger.verbose(`Provisioned projects`)
    }
  }

  private async provisionProject(input: ProjectProvisionInput) {
    const found = await this.data.core.data.faqItem.findUnique({ where: { id: input.id } })
    if (!found) {
      await this.data.create({ ...input })
      this.logger.verbose(`Provisioned FAQ item ${input.question}`)
    }
  }
}
