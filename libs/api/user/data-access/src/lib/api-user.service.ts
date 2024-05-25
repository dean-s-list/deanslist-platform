import { Injectable } from '@nestjs/common'
import { ApiUserResolveAdminService } from './api-user-resolve-admin.service'
import { ApiUserResolveUserService } from './api-user-resolve-user.service'

@Injectable()
export class ApiUserService {
  constructor(readonly admin: ApiUserResolveAdminService, readonly user: ApiUserResolveUserService) {}
}
