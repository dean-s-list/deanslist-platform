import { Injectable } from '@nestjs/common'
import { ApiProjectDataService } from './api-project-data.service'
import { UserFindManyProjectInput } from './dto/user-find-many-project.input'
import { ProjectPaging } from './entity/project-paging.entity'
import { getProjectWhereUserInput } from './helpers/get-project-where-user.input'

@Injectable()
export class ApiProjectResolveUserService {
  constructor(private readonly data: ApiProjectDataService) {}

  async findManyProject(input: UserFindManyProjectInput): Promise<ProjectPaging> {
    return this.data.findManyProject({
      limit: input.limit ?? 10,
      page: input.page ?? 1,
      orderBy: { createdAt: 'desc' },
      where: getProjectWhereUserInput(input),
    })
  }

  async findOneProject(projectId: string) {
    return this.data.findOneProject(projectId, { managers: true, members: true })
  }
}
