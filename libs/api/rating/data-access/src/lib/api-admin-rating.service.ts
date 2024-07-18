import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { AdminUpdateRatingInput } from './dto/admin-update-rating.input'

@Injectable()
export class ApiAdminRatingService {
  constructor(private readonly core: ApiCoreService) {}

  async deleteRating(ratingId: string) {
    const deleted = await this.core.data.rating.delete({ where: { id: ratingId } })
    return !!deleted
  }

  async updateRating(ratingId: string, input: AdminUpdateRatingInput) {
    return this.core.data.rating.update({ where: { id: ratingId }, data: input })
  }
}
