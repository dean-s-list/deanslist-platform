import { Injectable } from '@nestjs/common'
import { ApiProjectDataService } from './api-project-data.service'
import { ApiProjectResolveAdminService } from './api-project-resolve-admin.service'
import { ApiProjectResolveManagerService } from './api-project-resolve-manager.service'
import { ApiProjectResolveReviewerService } from './api-project-resolve-reviewer.service'

@Injectable()
export class ApiProjectService {
  constructor(
    readonly admin: ApiProjectResolveAdminService,
    readonly data: ApiProjectDataService,
    readonly manager: ApiProjectResolveManagerService,
    readonly reviewer: ApiProjectResolveReviewerService,
  ) {}
}
