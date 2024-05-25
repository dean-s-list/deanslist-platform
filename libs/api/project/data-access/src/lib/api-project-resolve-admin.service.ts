import { Injectable } from '@nestjs/common'
import { ApiProjectDataService } from './api-project-data.service'
import { AdminFindManyProjectInput } from './dto/admin-find-many-project.input'
import { AdminUpdateProjectInput } from './dto/admin-update-project.input'
import { ProjectPaging } from './entity/project-paging.entity'
import { getProjectWhereAdminInput } from './helpers/get-project-where-admin.input'

@Injectable()
export class ApiProjectResolveAdminService {
  constructor(private readonly data: ApiProjectDataService) {}

  async deleteProject(userId: string, projectId: string) {
    return this.data.deleteProject(userId, projectId)
  }

  async findManyProject(input: AdminFindManyProjectInput): Promise<ProjectPaging> {
    return this.data.findManyProject({
      limit: input.limit ?? 10,
      page: input.page ?? 1,
      orderBy: { createdAt: 'desc' },
      where: getProjectWhereAdminInput(input),
      include: { team: true },
    })
  }

  async findOneProject(projectId: string) {
    return this.data.findOneProject(projectId)
  }

  async updateProject(userId: string, projectId: string, input: AdminUpdateProjectInput) {
    return this.data.updateProject(userId, projectId, input)
  }
}
