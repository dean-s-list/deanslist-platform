import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { ProjectStatus } from '@deanslist-platform/sdk'
import { Injectable } from '@nestjs/common'
import { ManagerUpdateReviewInput } from './dto/manager-update-review.input'
import { ReviewerFindManyReviewByProjectInput } from './dto/reviewer-find-many-review-by-project-input'
import { getManagerReviewByProjectWhereInput } from './helpers/get-manager-review-by-project-where-input'

@Injectable()
export class ApiReviewResolveManagerService {
  constructor(private readonly core: ApiCoreService) {}

  async findManyReviewByProject(input: ReviewerFindManyReviewByProjectInput) {
    return this.core.data.review.findMany({
      orderBy: { createdAt: 'desc' },
      where: getManagerReviewByProjectWhereInput(input),
      include: {
        project: { include: { managers: true } },
        reviewer: true,
        comments: {
          where: { parentId: null },
          include: { ratings: true },
        },
      },
    })
  }

  async updateReview(userId: string, reviewId: string, input: ManagerUpdateReviewInput) {
    const review = await this.ensureReviewProjectManager(userId, reviewId)

    if (review.project.status !== ProjectStatus.Closed) {
      throw new Error('You can only update closed reviews')
    }

    return this.core.data.review.update({ where: { id: reviewId }, data: { ...input } })
  }

  private async ensureReviewProjectManager(userId: string, reviewId: string) {
    const review = await this.core.data.review.findUnique({
      where: { id: reviewId },
      include: { project: { include: { managers: true } } },
    })
    if (!review) {
      throw new Error(`Review not found`)
    }
    const manager = review.project.managers.find((m) => m.id === userId)
    if (!manager) {
      throw new Error(`You are not a manager of this project`)
    }
    return review
  }
}
