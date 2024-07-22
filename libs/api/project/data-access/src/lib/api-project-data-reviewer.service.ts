import { Injectable } from '@nestjs/common'
import { ProjectStatus } from '@prisma/client'
import { ApiProjectDataService } from './api-project-data.service'
import { ReviewerFindManyProjectInput } from './dto/reviewer-find-many-project-input'
import { ProjectPaging } from './entity/project-paging.entity'
import { getProjectWhereReviewerInput } from './helpers/get-project-where-reviewer.input'

@Injectable()
export class ApiProjectDataReviewerService {
  private readonly statuses: ProjectStatus[] = [ProjectStatus.Active, ProjectStatus.Closed]
  constructor(private readonly data: ApiProjectDataService) {}

  async findManyProject(userId: string, input: ReviewerFindManyProjectInput): Promise<ProjectPaging> {
    if (input.status && !this.statuses.includes(input.status)) {
      throw new Error(`You are not allowed to view ${input.status} projects`)
    }
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
      include: {
        reviewers: true,
        reviews: {
          include: {
            comments: true,
            reviewer: true,
          },
        },
      },
      where: { status: { in: this.statuses } },
    })
  }
}
