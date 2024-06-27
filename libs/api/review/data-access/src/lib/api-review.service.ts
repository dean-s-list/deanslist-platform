import { Injectable } from '@nestjs/common'
import { ApiReviewResolveAdminService } from './api-review-resolve-admin.service'
import { ApiReviewResolveReviewerService } from './api-review-resolve-reviewer.service'

@Injectable()
export class ApiReviewService {
  constructor(readonly admin: ApiReviewResolveAdminService, readonly reviewer: ApiReviewResolveReviewerService) {}
}
