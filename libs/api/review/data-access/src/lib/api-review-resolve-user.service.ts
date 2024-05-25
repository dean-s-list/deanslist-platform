import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { UserFindManyReviewInput } from './dto/user-find-many-review.input'
import { Review } from './entity/review.entity'
import { getUserReviewWhereInput } from './helpers/get-user-review-where.input'

@Injectable()
export class ApiReviewResolveUserService {
  constructor(private readonly core: ApiCoreService) {}

  async createReview(userId: string, projectId: string) {
    return this.core.data.review.create({ data: { projectId, reviewerId: userId } })
  }

  async deleteReview(userId: string, reviewId: string) {
    const found = await this.core.data.review.findUnique({ where: { id: reviewId } })
    if (!found) {
      return false
    }
    if (found.reviewerId !== userId) {
      return false
    }
    const deleted = await this.core.data.review.delete({ where: { id: reviewId } })
    return !!deleted
  }

  async findManyReview(input: UserFindManyReviewInput): Promise<Review[]> {
    return this.core.data.review.findMany({
      orderBy: { createdAt: 'desc' },
      where: getUserReviewWhereInput(input),
      include: { project: true, reviewer: true },
    })
  }

  async findOneReview(reviewId: string) {
    return this.core.data.review.findUnique({ where: { id: reviewId }, include: { project: true, reviewer: true } })
  }

  async findUserProjectReview(userId: string, projectId: string) {
    return this.core.data.review.findUnique({
      where: { projectId_reviewerId: { projectId, reviewerId: userId } },
      include: { project: true, reviewer: true },
    })
  }
}
