import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { UserCreateRatingInput } from './dto/user-create-rating.input'
import { UserFindManyRatingInput } from './dto/user-find-many-rating.input'
import { UserUpdateRatingInput } from './dto/user-update-rating.input'
import { Rating } from './entity/rating.entity'
import { getUserRatingWhereInput } from './helpers/get-user-rating-where.input'

@Injectable()
export class ApiUserRatingService {
  constructor(private readonly core: ApiCoreService) {}

  async createRating(userId: string, input: UserCreateRatingInput) {
    return this.core.data.rating.create({ data: { ...input, authorId: userId } })
  }

  async deleteRating(userId: string, ratingId: string) {
    await this.ensureCommentAuthor(userId, ratingId)
    const deleted = await this.core.data.rating.delete({ where: { id: ratingId } })
    return !!deleted
  }

  async findManyRating(input: UserFindManyRatingInput): Promise<Rating[]> {
    return this.core.data.rating.findMany({
      orderBy: { createdAt: 'desc' },
      where: getUserRatingWhereInput(input),
    })
  }

  async updateRating(userId: string, ratingId: string, input: UserUpdateRatingInput) {
    await this.ensureCommentAuthor(userId, ratingId)
    return this.core.data.rating.update({ where: { id: ratingId }, data: input })
  }

  private async ensureComment(ratingId: string) {
    const found = await this.core.data.rating.findUnique({ where: { id: ratingId } })
    if (!found) {
      throw new Error('Review Comment Rating not found')
    }
    return found
  }
  private async ensureCommentAuthor(userId: string, ratingId: string) {
    const found = await this.ensureComment(ratingId)
    if (found.authorId !== userId) {
      throw new Error('Unauthorized')
    }
    return found
  }
}
