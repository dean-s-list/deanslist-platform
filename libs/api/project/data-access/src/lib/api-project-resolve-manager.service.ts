import { Injectable } from '@nestjs/common'
import { ApiProjectDataService } from './api-project-data.service'
import { ManagerCreateProjectInput } from './dto/manager-create-project.input'
import { ManagerFindManyProjectInput } from './dto/manager-find-many-project.input'
import { ManagerUpdateProjectInput } from './dto/manager-update-project.input'
import { ProjectPaging } from './entity/project-paging.entity'
import { getProjectWhereManagerInput } from './helpers/get-project-where-manager.input'

@Injectable()
export class ApiProjectResolveManagerService {
  constructor(private readonly data: ApiProjectDataService) {}

  async createProject(userId: string, input: ManagerCreateProjectInput) {
    await this.data.ensureCommunityManager({ communityId: input.communityId, userId })

    return this.data.createProject(userId, input)
  }

  async deleteProject(userId: string, projectId: string) {
    await this.data.ensureProjectAdmin({ projectId, userId })

    return this.data.deleteProject(userId, projectId)
  }

  async findManyProject(userId: string, input: ManagerFindManyProjectInput): Promise<ProjectPaging> {
    return this.data.findManyProject({
      limit: input.limit ?? 10,
      page: input.page ?? 1,
      orderBy: { createdAt: 'desc' },
      where: getProjectWhereManagerInput(userId, input),
    })
  }

  async findOneProject(userId: string, projectId: string) {
    return this.data.findOneProject(
      projectId,
      { reviewers: true, referral: true },
      {
        OR: [
          {
            managers: { some: { id: userId } },
          },
          {
            community: { managers: { some: { userId, admin: true } } },
          },
        ],
      },
    )
  }

  async updateProject(userId: string, projectId: string, input: ManagerUpdateProjectInput) {
    await this.data.ensureProjectManager({ projectId, userId })

    return this.data.updateProject(userId, projectId, input)
  }

  async addProjectManager(userId: string, projectId: string, managerUserId: string) {
    await this.data.ensureProjectManager({ projectId, userId })

    return this.data.addProjectManager(userId, projectId, managerUserId)
  }

  async removeProjectManager(userId: string, projectId: string, managerUserId: string) {
    await this.data.ensureProjectManager({ projectId, userId })

    return this.data.removeProjectManager(userId, projectId, managerUserId)
  }

  async addProjectReviewer(userId: string, projectId: string, reviewerUserId: string) {
    await this.data.ensureProjectManager({ projectId, userId })

    return this.data.addProjectReviewer(userId, projectId, reviewerUserId)
  }

  async removeProjectReviewer(userId: string, projectId: string, reviewerUserId: string) {
    await this.data.ensureProjectManager({ projectId, userId })

    return this.data.removeProjectReviewer(userId, projectId, reviewerUserId)
  }

  async addProjectReferral(userId: string, projectId: string, referralUserId: string) {
    await this.data.ensureProjectManager({ projectId, userId })

    return this.data.addProjectReferral(userId, projectId, referralUserId)
  }

  async removeProjectReferral(userId: string, projectId: string, referralUserId: string) {
    await this.data.ensureProjectManager({ projectId, userId })

    return this.data.removeProjectReferral(userId, projectId, referralUserId)
  }
}
