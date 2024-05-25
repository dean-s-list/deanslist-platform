import { Injectable } from '@nestjs/common'
import { ApiReviewResolveAdminService } from './api-review-resolve-admin.service'
import { ApiReviewResolveUserService } from './api-review-resolve-user.service'

@Injectable()
export class ApiReviewService {
  // Use the following command to generate the CRUD for this service for a certain actor
  // nx g api-crud --app Api --model review --actor <admin|user|etc...>
  constructor(readonly user: ApiReviewResolveUserService, readonly admin: ApiReviewResolveAdminService) {}
}
