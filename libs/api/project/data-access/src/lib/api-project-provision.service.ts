import { COMMUNITIES_PROVISIONED } from '@deanslist-platform/api-community-data-access'
import { ApiCoreService, slugifyId } from '@deanslist-platform/api-core-data-access'
import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { ApiProjectDataService } from './api-project-data.service'
import { ProjectProvisionInput, provisionProjects } from './api-project-provision-data'

@Injectable()
export class ApiProjectProvisionService {
  private readonly logger = new Logger(ApiProjectProvisionService.name)

  constructor(private readonly core: ApiCoreService, private readonly data: ApiProjectDataService) {}

  @OnEvent(COMMUNITIES_PROVISIONED)
  async onApplicationStarted() {
    if (this.core.config.databaseProvision) {
      await Promise.all(provisionProjects.map((project) => this.provisionProject(project)))
      this.logger.verbose(`Provisioned projects`)
    }
  }

  private async provisionProject(input: ProjectProvisionInput) {
    const name = input.name.trim()
    const slug = slugifyId(name, true)
    if (
      !(await this.core.data.project.findUnique({
        where: { communityId_slug: { communityId: input.communityId, slug } },
      }))
    ) {
      await this.data.createProject('alice', { ...input, name })
      this.logger.verbose(`Provisioned project ${input.name} `)
    }
  }
}
