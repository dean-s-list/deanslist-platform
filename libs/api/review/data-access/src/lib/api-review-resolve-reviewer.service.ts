import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { ProjectRole, ProjectStatus } from '@prisma/client'
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
      include: { members: true },
    })
    if (!project) {
      throw new Error('Project not found')
    }
    if (project.status !== ProjectStatus.Active) {
      throw new Error('Project is not active')
    }
    const projectMember = await this.getProjectMemberReviewer({ projectId, userId, reviewsOpen: project.reviewsOpen })
    return this.core.data.review.create({
      data: { projectMemberId: projectMember.id },
      include: { projectMember: true },
    })
  }

  async getProjectMemberReviewer({
    projectId,
    userId,
    reviewsOpen,
  }: {
    projectId: string
    userId: string
    reviewsOpen: boolean
  }) {
    const found = await this.core.data.projectMember.findUnique({ where: { projectId_userId: { projectId, userId } } })
    if (!found) {
      if (!reviewsOpen) {
        throw new Error('Project is not open for reviews')
      }
      return this.core.data.projectMember.create({ data: { userId, projectId, role: ProjectRole.Reviewer } })
    }
    return found
  }

  async deleteReview(userId: string, reviewId: string) {
    const found = await this.core.data.review.findUnique({ where: { id: reviewId }, include: { projectMember: true } })
    if (!found) {
      return false
    }
    if (found.projectMember?.userId !== userId) {
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
        projectMember: { include: { project: true, user: true } },
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
        projectMember: { include: { project: true, user: true } },
        comments: {
          where: { parentId: null },
          include: { ratings: true },
        },
      },
    })
  }

  async findOneReview(reviewId: string) {
    return this.core.data.review.findUnique({
      where: { id: reviewId },
      include: { projectMember: { include: { project: true, user: true } } },
    })
  }

  async findUserProjectReview(userId: string, projectId: string) {
    return this.core.data.review.findFirst({
      where: { projectMember: { projectId, userId } },
      include: { projectMember: { include: { project: true, user: true } } },
    })
  }
}
