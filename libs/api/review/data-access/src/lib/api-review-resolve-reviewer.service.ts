import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { ProjectStatus } from '@prisma/client'
import { ReviewerFindManyReviewByProjectInput } from './dto/reviewer-find-many-review-by-project-input'
import { ReviewerFindManyReviewByUsernameInput } from './dto/reviewer-find-many-review-by-username-input'
import { getReviewerReviewByProjectWhereInput } from './helpers/get-reviewer-review-by-project-where-input'
import { getReviewerReviewByUsernameWhereInput } from './helpers/get-reviewer-review-by-username-where-input'

@Injectable()
export class ApiReviewResolveReviewerService {
  constructor(private readonly core: ApiCoreService) {}

  async createReview(userId: string, projectId: string) {
    const project = await this.core.data.project.findUnique({
      where: { id: projectId },
      include: { reviews: true, reviewers: true },
    })
    if (!project) {
      throw new Error('Project not found')
    }
    if (project.status !== ProjectStatus.Active) {
      throw new Error('Project is not active')
    }
    if (!project.reviewsOpen && !project.reviewers.some((r) => r.id === userId)) {
      throw new Error('Project is not open for reviews')
    }
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

  async findManyReviewByProject(input: ReviewerFindManyReviewByProjectInput) {
    return this.core.data.review.findMany({
      orderBy: { createdAt: 'desc' },
      where: getReviewerReviewByProjectWhereInput(input),
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

  async findManyReviewByUsername(input: ReviewerFindManyReviewByUsernameInput) {
    return this.core.data.review.findMany({
      orderBy: { createdAt: 'desc' },
      where: getReviewerReviewByUsernameWhereInput(input),
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
