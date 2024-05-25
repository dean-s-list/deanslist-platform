import { Injectable } from '@nestjs/common'
import { ApiCommentResolveAdminService } from './api-comment-resolve-admin.service'
import { ApiCommentResolveUserService } from './api-comment-resolve-user.service'

@Injectable()
export class ApiCommentService {
  // Use the following command to generate the CRUD for this service for a certain actor
  // nx g api-crud --app Api --model comment --actor <admin|user|etc...>
  constructor(readonly user: ApiCommentResolveUserService, readonly admin: ApiCommentResolveAdminService) {}
}
