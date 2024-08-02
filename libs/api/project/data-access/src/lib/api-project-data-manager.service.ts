import { User } from '@deanslist-platform/api-user-data-access'
import { Injectable } from '@nestjs/common'
import { ApiProjectDataService } from './api-project-data.service'
import { ApiProjectMemberDataService } from './api-project-member-data.service'
import { ManagerCreateProjectInput } from './dto/manager-create-project.input'
import { ManagerFindManyProjectInput } from './dto/manager-find-many-project.input'
import { ManagerUpdateProjectInput, ManagerUpdateProjectMemberInput } from './dto/manager-update-project.input'
import { ProjectPaging } from './entity/project-paging.entity'
import { ProjectStatus } from './entity/project-status.enum'
import { getProjectWhereManagerAccessInput } from './helpers/get-project-where-manager-access-input'
import { getProjectWhereManagerInput } from './helpers/get-project-where-manager.input'

@Injectable()
export class ApiProjectDataManagerService {
  constructor(private readonly data: ApiProjectDataService, private readonly member: ApiProjectMemberDataService) {}

  async createProject(userId: string, input: ManagerCreateProjectInput) {
    await this.member.ensureCommunityManager({ communityId: input.communityId, userId })

    return this.data.createProject(userId, input)
  }

  async deleteProject(userId: string, projectId: string) {
    await this.member.ensureProjectAdmin({ projectId, userId })

    return this.data.deleteProject(userId, projectId)
  }

  async findManyProject(user: User, input: ManagerFindManyProjectInput): Promise<ProjectPaging> {
    return this.data.findManyProject({
      limit: input.limit ?? 10,
      page: input.page ?? 1,
      orderBy: input.orderBy ? { [input.orderBy]: input.orderDirection ?? 'asc' } : { createdAt: 'desc' },
      where: getProjectWhereManagerInput(user, input),
      include: {
        members: { include: { review: { include: { comments: { include: { ratings: true } } } }, user: true } },
      },
    })
  }

  async findOneProject(user: User, projectId: string) {
    return this.data.findOneProject(projectId, {
      include: {
        members: { include: { review: { include: { comments: { include: { ratings: true } } } }, user: true } },
      },
      where: getProjectWhereManagerAccessInput(user),
    })
  }

  async updateProject(userId: string, projectId: string, input: ManagerUpdateProjectInput) {
    await this.member.ensureProjectManager({ projectId, userId })

    return this.data.updateProject(projectId, input)
  }

  async updateProjectStatus(userId: string, projectId: string, status: ProjectStatus) {
    await this.member.ensureProjectManager({ projectId, userId })

    return this.data.updateProjectStatus(projectId, status)
  }

  async splitByRating(userId: string, projectId: string) {
    await this.member.ensureProjectManager({ projectId, userId })

    return this.data.splitByRating(projectId)
  }

  async updateProjectMember(userId: string, projectMemberId: string, input: ManagerUpdateProjectMemberInput) {
    const projectMember = await this.data.findOneProjectMember(projectMemberId)
    await this.member.ensureProjectManager({ projectId: projectMember.projectId, userId })

    if (projectMember?.project?.status !== ProjectStatus.Closed) {
      throw new Error('You can only update when the project is closed')
    }

    return this.data.updateProjectMember(projectMemberId, input)
  }
}
