import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
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
}
