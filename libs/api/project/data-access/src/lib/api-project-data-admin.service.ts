import { Injectable } from '@nestjs/common'
import { ApiProjectDataService } from './api-project-data.service'
import { AdminFindManyProjectInput } from './dto/admin-find-many-project.input'
import { AdminUpdateProjectInput } from './dto/admin-update-project.input'
import { ProjectPaging } from './entity/project-paging.entity'
import { getProjectWhereAdminInput } from './helpers/get-project-where-admin.input'

@Injectable()
export class ApiProjectDataAdminService {
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
      include: { community: true },
    })
  }

  async findOneProject(projectId: string) {
    return this.data.findOneProject(projectId, { reviewers: true, referral: true })
  }

  async updateProject(userId: string, projectId: string, input: AdminUpdateProjectInput) {
    return this.data.updateProject(userId, projectId, input)
  }

  async addProjectManager(userId: string, projectId: string, managerUserId: string) {
    return this.data.addProjectManager(userId, projectId, managerUserId)
  }

  async removeProjectManager(userId: string, projectId: string, managerUserId: string) {
    return this.data.removeProjectManager(userId, projectId, managerUserId)
  }

  async addProjectReviewer(userId: string, projectId: string, reviewerUserId: string) {
    return this.data.addProjectReviewer(userId, projectId, reviewerUserId)
  }

  async removeProjectReviewer(userId: string, projectId: string, reviewerUserId: string) {
    return this.data.removeProjectReviewer(userId, projectId, reviewerUserId)
  }

  async addProjectReferral(userId: string, projectId: string, referralUserId: string) {
    return this.data.addProjectReferral(userId, projectId, referralUserId)
  }

  async removeProjectReferral(userId: string, projectId: string, referralUserId: string) {
    return this.data.removeProjectReferral(userId, projectId, referralUserId)
  }
}
