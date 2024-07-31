import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { ApiProjectService } from '@deanslist-platform/api-project-data-access'
import { Injectable } from '@nestjs/common'
import { ProjectStatus } from '@prisma/client'
import { ManagerUpdateReviewInput } from './dto/manager-update-review.input'
import { ReviewerFindManyReviewByProjectInput } from './dto/reviewer-find-many-review-by-project-input'
import { getManagerReviewByProjectWhereInput } from './helpers/get-manager-review-by-project-where-input'

@Injectable()
export class ApiReviewResolveManagerService {
  constructor(private readonly core: ApiCoreService, private readonly project: ApiProjectService) {}

  async findManyReviewByProject(input: ReviewerFindManyReviewByProjectInput) {
    return this.core.data.review.findMany({
      orderBy: { createdAt: 'desc' },
      where: getManagerReviewByProjectWhereInput(input),
      include: {
        projectMember: { include: { project: { include: { members: true } }, user: true } },
        comments: {
          where: { parentId: null },
          include: { ratings: true },
        },
      },
    })
  }

  async updateReview(userId: string, reviewId: string, input: ManagerUpdateReviewInput) {
    const review = await this.ensureReviewProjectManager(userId, reviewId)

    if (review.projectMember?.project?.status !== ProjectStatus.Closed) {
      throw new Error('You can only update closed reviews')
    }

    return this.core.data.review.update({ where: { id: reviewId }, data: { ...input } })
  }

  private async ensureReviewProjectManager(userId: string, reviewId: string) {
    const review = await this.core.data.review.findUnique({
      where: { id: reviewId },
      include: { projectMember: { include: { project: true, user: true } } },
    })
    if (!review) {
      throw new Error(`Review not found`)
    }
    const projectMember = review.projectMember
    await this.project.member.ensureProjectManager({ userId, projectId: projectMember.projectId })

    return review
  }
}
