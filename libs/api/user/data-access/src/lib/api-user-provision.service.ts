import { ApiCoreService, CORE_APP_STARTED, slugifyUsername } from '@deanslist-platform/api-core-data-access'
import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Prisma, UserStatus } from '@prisma/client'
import { ApiUserDataService } from './api-user-data.service'
import { provisionUsers } from './api-user-provision-data'
import { USERS_PROVISIONED } from './api-user.events'

@Injectable()
export class ApiUserProvisionService {
  private readonly logger = new Logger(ApiUserProvisionService.name)

  constructor(private readonly core: ApiCoreService, private readonly data: ApiUserDataService) {}

  @OnEvent(CORE_APP_STARTED)
  async onApplicationStarted() {
    if (this.core.config.databaseProvision) {
      await Promise.all(provisionUsers.map((user) => this.provisionUser(user)))
      this.logger.verbose(`Provisioned users`)
      this.core.event.emit(USERS_PROVISIONED)
    }
  }

  private async provisionUser(input: Prisma.UserCreateInput) {
    const username = slugifyUsername(input.username)
    if (!(await this.core.data.user.findUnique({ where: { id: username } }))) {
      await this.data.createUser({ ...input, id: username, status: input.status ?? UserStatus.Active })
      this.logger.verbose(
        `Provisioned ${input.role} ${input.username} ${input.password ? 'and password' : 'and external provider'}`,
      )
    }
  }
}
