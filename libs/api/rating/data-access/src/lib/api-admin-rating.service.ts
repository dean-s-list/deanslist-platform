import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { AdminFindManyRatingInput } from './dto/admin-find-many-rating.input'
import { AdminUpdateRatingInput } from './dto/admin-update-rating.input'
import { Rating } from './entity/rating.entity'
import { getAdminRatingWhereInput } from './helpers/get-admin-rating-where.input'

@Injectable()
export class ApiAdminRatingService {
  constructor(private readonly core: ApiCoreService) {}

  async deleteRating(ratingId: string) {
    const deleted = await this.core.data.rating.delete({ where: { id: ratingId } })
    return !!deleted
  }

  async findManyRating(input: AdminFindManyRatingInput): Promise<Rating[]> {
    return this.core.data.rating.findMany({
      orderBy: { createdAt: 'desc' },
      where: getAdminRatingWhereInput(input),
    })
  }

  async updateRating(ratingId: string, input: AdminUpdateRatingInput) {
    return this.core.data.rating.update({ where: { id: ratingId }, data: input })
  }
}
