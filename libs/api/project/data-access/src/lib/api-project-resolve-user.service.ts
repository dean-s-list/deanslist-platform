import { Injectable } from '@nestjs/common'
import { ApiProjectDataService } from './api-project-data.service'
import { UserCreateProjectInput } from './dto/user-create-project.input'
import { UserFindManyProjectInput } from './dto/user-find-many-project.input'
import { UserUpdateProjectInput } from './dto/user-update-project.input'
import { ProjectPaging } from './entity/project-paging.entity'
import { getProjectWhereUserInput } from './helpers/get-project-where-user.input'

@Injectable()
export class ApiProjectResolveUserService {
  constructor(private readonly data: ApiProjectDataService) {}

  async createProject(userId: string, input: UserCreateProjectInput) {
    return this.data.createProject(userId, input)
  }

  async deleteProject(userId: string, projectId: string) {
    return this.data.deleteProject(userId, projectId)
  }

  async findManyProject(input: UserFindManyProjectInput): Promise<ProjectPaging> {
    return this.data.findManyProject({
      limit: input.limit ?? 10,
      page: input.page ?? 1,
      orderBy: { createdAt: 'desc' },
      where: getProjectWhereUserInput(input),
    })
  }

  async findOneProject(projectId: string) {
    return this.data.findOneProject(projectId)
  }

  async updateProject(userId: string, projectId: string, input: UserUpdateProjectInput) {
    return this.data.updateProject(userId, projectId, input)
  }
}
