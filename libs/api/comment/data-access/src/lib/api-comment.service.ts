import { Injectable } from '@nestjs/common'
import { ApiCommentResolveAdminService } from './api-comment-resolve-admin.service'
import { ApiCommentResolveManagerService } from './api-comment-resolve-manager.service'
import { ApiCommentResolveReviewerService } from './api-comment-resolve-reviewer.service'

@Injectable()
export class ApiCommentService {
  constructor(
    readonly manager: ApiCommentResolveManagerService,
    readonly reviewer: ApiCommentResolveReviewerService,
    readonly admin: ApiCommentResolveAdminService,
  ) {}
}
