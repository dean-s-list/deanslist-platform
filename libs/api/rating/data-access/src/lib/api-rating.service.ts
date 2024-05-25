import { Injectable } from '@nestjs/common'
import { ApiUserRatingService } from './api-user-rating.service'
import { ApiAdminRatingService } from './api-admin-rating.service'

@Injectable()
export class ApiRatingService {
  // Use the following command to generate the CRUD for this service for a certain actor
  // nx g api-crud --app Api --model rating --actor <admin|user|etc...>
  constructor(readonly user: ApiUserRatingService, readonly admin: ApiAdminRatingService) {}
}
