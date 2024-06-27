import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { ReviewerFindManyReviewByProjectInput } from './dto/reviewer-find-many-review-by-project-input'
import { ReviewerFindManyReviewByUsernameInput } from './dto/reviewer-find-many-review-by-username-input'
import { Review } from './entity/review.entity'
import { getReviewerReviewByProjectWhereInput } from './helpers/get-reviewer-review-by-project-where-input'
import { getReviewerReviewByUsernameWhereInput } from './helpers/get-reviewer-review-by-username-where-input'

@Injectable()
export class ApiReviewResolveReviewerService {
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

  async findManyReviewByProject(input: ReviewerFindManyReviewByProjectInput): Promise<Review[]> {
    return this.core.data.review.findMany({
      orderBy: { createdAt: 'desc' },
      where: getReviewerReviewByProjectWhereInput(input),
      include: { project: true, reviewer: true },
    })
  }

  async findManyReviewByUsername(input: ReviewerFindManyReviewByUsernameInput): Promise<Review[]> {
    return this.core.data.review.findMany({
      orderBy: { createdAt: 'desc' },
      where: getReviewerReviewByUsernameWhereInput(input),
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
