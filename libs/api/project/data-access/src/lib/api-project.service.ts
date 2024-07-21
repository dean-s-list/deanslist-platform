import { Injectable } from '@nestjs/common'
import { ApiProjectDataAdminService } from './api-project-data-admin.service'
import { ApiProjectDataManagerService } from './api-project-data-manager.service'
import { ApiProjectDataReviewerService } from './api-project-data-reviewer.service'
import { ApiProjectDataService } from './api-project-data.service'

@Injectable()
export class ApiProjectService {
  constructor(
    readonly admin: ApiProjectDataAdminService,
    readonly data: ApiProjectDataService,
    readonly manager: ApiProjectDataManagerService,
    readonly reviewer: ApiProjectDataReviewerService,
  ) {}
}
