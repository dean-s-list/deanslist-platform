import { Injectable } from '@nestjs/common'
import { ApiProjectDataService } from './api-project-data.service'
import { ReviewerFindManyProjectInput } from './dto/reviewer-find-many-project-input'
import { ProjectPaging } from './entity/project-paging.entity'
import { getProjectWhereReviewerInput } from './helpers/get-project-where-reviewer.input'

@Injectable()
export class ApiProjectDataReviewerService {
  constructor(private readonly data: ApiProjectDataService) {}

  async findManyProject(userId: string, input: ReviewerFindManyProjectInput): Promise<ProjectPaging> {
    return this.data.findManyProject({
      limit: input.limit ?? 10,
      page: input.page ?? 1,
      orderBy: input.orderBy ? { [input.orderBy]: input.orderDirection ?? 'asc' } : { createdAt: 'desc' },
      where: getProjectWhereReviewerInput(userId, input),
      include: { reviews: { include: { comments: true } } },
    })
  }

  async findOneProject(projectId: string) {
    return this.data.findOneProject(projectId, {
      reviewers: true,
      reviews: {
        include: {
          comments: true,
          reviewer: true,
        },
      },
    })
  }
}
