import { Injectable } from '@nestjs/common'
import { ProjectRole } from '@prisma/client'
import { ApiProjectDataService } from './api-project-data.service'
import { ApiProjectMemberDataService } from './api-project-member-data.service'
import { AdminFindManyProjectInput } from './dto/admin-find-many-project.input'
import { AdminUpdateProjectInput } from './dto/admin-update-project.input'
import { ProjectPaging } from './entity/project-paging.entity'
import { getProjectWhereAdminInput } from './helpers/get-project-where-admin.input'

@Injectable()
export class ApiProjectDataAdminService {
  constructor(private readonly data: ApiProjectDataService, private readonly member: ApiProjectMemberDataService) {}

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
    return this.data.findOneProject(projectId, {
      include: {
        members: {
          include: {
            review: {
              include: { comments: { include: { ratings: true } } },
            },
            user: true,
          },
        },
      },
    })
  }

  async updateProject(userId: string, projectId: string, input: AdminUpdateProjectInput) {
    return this.data.updateProject(projectId, input, true)
  }

  async addProjectManager(userId: string, projectId: string, managerUserId: string) {
    const added = await this.member.addProjectMember({ projectId, userId: managerUserId, role: ProjectRole.Manager })

    return !!added
  }

  async removeProjectMember(userId: string, projectMemberId: string) {
    const found = await this.member.getProjectMemberById({ projectMemberId })
    if (!found) {
      throw new Error(`Project member not found`)
    }
    const deleted = await this.member.deleteProjectMemberById({ projectMemberId })

    return !!deleted
  }

  async updateProjectMemberRole(userId: string, projectMemberId: string, role: ProjectRole) {
    const found = await this.member.getProjectMemberById({ projectMemberId })
    if (!found) {
      throw new Error(`Project member not found`)
    }
    const updated = await this.member.updateProjectMemberRole({ projectMemberId, role })

    return !!updated
  }
}
