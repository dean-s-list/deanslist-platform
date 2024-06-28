import { Injectable } from '@nestjs/common'
import { ApiReviewResolveAdminService } from './api-review-resolve-admin.service'
import { ApiReviewResolveManagerService } from './api-review-resolve-manager.service'
import { ApiReviewResolveReviewerService } from './api-review-resolve-reviewer.service'

@Injectable()
export class ApiReviewService {
  constructor(
    readonly admin: ApiReviewResolveAdminService,
    readonly manager: ApiReviewResolveManagerService,
    readonly reviewer: ApiReviewResolveReviewerService,
  ) {}
}
