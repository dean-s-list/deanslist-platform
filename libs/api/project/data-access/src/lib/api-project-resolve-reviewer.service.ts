import { Injectable } from '@nestjs/common'
import { ApiProjectDataService } from './api-project-data.service'
import { ReviewerFindManyProjectInput } from './dto/reviewer-find-many-project-input'
import { ProjectPaging } from './entity/project-paging.entity'
import { getProjectWhereUserInput } from './helpers/get-project-where-user.input'

@Injectable()
export class ApiProjectResolveReviewerService {
  constructor(private readonly data: ApiProjectDataService) {}

  async findManyProject(input: ReviewerFindManyProjectInput): Promise<ProjectPaging> {
    return this.data.findManyProject({
      limit: input.limit ?? 10,
      page: input.page ?? 1,
      orderBy: { createdAt: 'desc' },
      where: getProjectWhereUserInput(input),
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
