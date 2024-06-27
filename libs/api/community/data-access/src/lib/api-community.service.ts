import { Injectable } from '@nestjs/common'
import { ApiCommunityDataService } from './api-community-data.service'
import { ApiCommunityResolveAdminService } from './api-community-resolve-admin.service'
import { ApiCommunityResolveManagerService } from './api-community-resolve-manager.service'
import { ApiCommunityResolveUserService } from './api-community-resolve-user.service'

@Injectable()
export class ApiCommunityService {
  constructor(
    readonly admin: ApiCommunityResolveAdminService,
    readonly data: ApiCommunityDataService,
    readonly manager: ApiCommunityResolveManagerService,
    readonly user: ApiCommunityResolveUserService,
  ) {}
}
