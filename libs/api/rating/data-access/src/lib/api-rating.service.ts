import { Injectable } from '@nestjs/common'
import { ApiAdminRatingService } from './api-admin-rating.service'
import { ApiManagerRatingService } from './api-manager-rating.service'

@Injectable()
export class ApiRatingService {
  constructor(readonly manager: ApiManagerRatingService, readonly admin: ApiAdminRatingService) {}
}
