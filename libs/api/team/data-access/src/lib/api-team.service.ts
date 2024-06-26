import { Injectable } from '@nestjs/common'
import { ApiTeamDataService } from './api-team-data.service'
import { ApiTeamResolveAdminService } from './api-team-resolve-admin.service'
import { ApiTeamResolveManagerService } from './api-team-resolve-manager.service'
import { ApiTeamResolveUserService } from './api-team-resolve-user.service'

@Injectable()
export class ApiTeamService {
  constructor(
    readonly admin: ApiTeamResolveAdminService,
    readonly data: ApiTeamDataService,
    readonly manager: ApiTeamResolveManagerService,
    readonly user: ApiTeamResolveUserService,
  ) {}
}
