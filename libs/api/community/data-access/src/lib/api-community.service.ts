import { Injectable } from '@nestjs/common'
import { ApiCommunityDataAdminService } from './api-community-data-admin.service'
import { ApiCommunityDataManagerService } from './api-community-data-manager.service'
import { ApiCommunityDataUserService } from './api-community-data-user.service'
import { ApiCommunityDataService } from './api-community-data.service'

@Injectable()
export class ApiCommunityService {
  constructor(
    readonly admin: ApiCommunityDataAdminService,
    readonly data: ApiCommunityDataService,
    readonly manager: ApiCommunityDataManagerService,
    readonly user: ApiCommunityDataUserService,
  ) {}
}
