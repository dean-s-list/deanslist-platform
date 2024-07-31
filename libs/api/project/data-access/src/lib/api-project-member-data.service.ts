import { ApiCommunityService } from '@deanslist-platform/api-community-data-access'
import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable, Logger } from '@nestjs/common'
import { ApiProjectDataService } from './api-project-data.service'
import { ProjectRole } from './entity/project-role.enum'

@Injectable()
export class ApiProjectMemberDataService {
  private readonly logger = new Logger(ApiProjectMemberDataService.name)
  constructor(
    private readonly core: ApiCoreService,
    private readonly data: ApiProjectDataService,
    private readonly community: ApiCommunityService,
  ) {}

  async ensureProjectAdmin({ projectId, userId }: { projectId: string; userId: string }) {
    const found = await this.data.findOneProject(projectId)
    await this.ensureCommunityAdmin({ communityId: found.communityId, userId })
    return found
  }

  async ensureProjectManager({ projectId, userId }: { projectId: string; userId: string }) {
    const found = await this.data.findOneProject(projectId)

    const isCommunityAdmin = !!found.community.managers?.find((p) => (p.userId = userId))?.admin
    const isManager = found.members.some((p) => p.userId === userId && p.role === ProjectRole.Manager)
    if (!isCommunityAdmin || !isManager) {
      throw new Error(`You are not a manager of this project`)
    }
    return found
  }

  async ensureCommunityAdmin({ communityId, userId }: { communityId: string; userId: string }) {
    return this.community.data.ensureCommunityAdmin({ communityId, userId })
  }

  async ensureCommunityManager({ communityId, userId }: { communityId: string; userId: string }) {
    return this.community.data.ensureCommunityManager({ communityId, userId })
  }

  async addProjectManager(userId: string, projectId: string, managerUserId: string) {
    await this.ensureProjectManager({ projectId, userId })

    const added = await this.addProjectMember({ projectId, userId: managerUserId, role: ProjectRole.Manager })
    // TODO: Emit events, announce in Discord.
    return !!added
  }

  async addProjectReviewer(userId: string, projectId: string, reviewerUserId: string) {
    await this.ensureProjectManager({ projectId, userId })

    const added = await this.addProjectMember({ projectId, userId: reviewerUserId, role: ProjectRole.Reviewer })
    // TODO: Emit events, announce in Discord.
    return !!added
  }

  async addProjectReferral(userId: string, projectId: string, referralUserId: string) {
    await this.ensureProjectManager({ projectId, userId })

    const added = await this.addProjectMember({ projectId, userId: referralUserId, role: ProjectRole.Referral })
    // TODO: Emit events, announce in Discord.
    return !!added
  }

  async removeProjectManager(userId: string, projectId: string, managerUserId: string) {
    await this.ensureProjectManager({ projectId, userId })

    const managers = await this.getProjectMembersManager({ projectId })
    if (managers?.length === 1) {
      throw new Error('Cannot remove last project manager')
    }

    const removed = await this.deleteProjectMember({ projectId, userId: managerUserId })
    // TODO: Emit events, announce in Discord.
    return !!removed
  }

  async removeProjectReviewer(userId: string, projectId: string, reviewerUserId: string) {
    await this.ensureProjectManager({ projectId, userId })

    const removed = await this.deleteProjectMember({ projectId, userId: reviewerUserId })
    // TODO: Emit events, announce in Discord.
    return !!removed
  }

  async removeProjectReferral(userId: string, projectId: string, referralUserId: string) {
    await this.ensureProjectManager({ projectId, userId })

    const removed = await this.deleteProjectMember({ projectId, userId: referralUserId })
    // TODO: Emit events, announce in Discord.
    return !!removed
  }

  async addProjectMember({ projectId, role, userId }: { projectId: string; role: ProjectRole; userId: string }) {
    await this.ensureNotMember({ projectId, userId })

    return this.core.data.projectMember.create({ data: { projectId, role, userId } })
  }

  private async ensureMember({ projectId, userId }: { projectId: string; userId: string }) {
    const existing = await this.getProjectMember({ userId, projectId })
    if (!existing) {
      throw new Error(`User ${userId} is not a member of ${projectId}`)
    }
  }

  private async ensureNotMember({ projectId, userId }: { projectId: string; userId: string }) {
    const existing = await this.getProjectMember({ userId, projectId })
    if (existing) {
      throw new Error(`User ${userId} is already member of ${projectId} with role ${existing.role}`)
    }
  }

  async getProjectMemberById({ projectMemberId }: { projectMemberId: string }) {
    return this.core.data.projectMember.findUnique({ where: { id: projectMemberId } })
  }

  async deleteProjectMemberById({ projectMemberId }: { projectMemberId: string }) {
    return this.core.data.projectMember.delete({ where: { id: projectMemberId } })
  }

  async updateProjectMemberRole({ projectMemberId, role }: { projectMemberId: string; role: ProjectRole }) {
    return this.core.data.projectMember.update({ where: { id: projectMemberId }, data: { role } })
  }

  async deleteProjectMember({ projectId, userId }: { projectId: string; userId: string }) {
    await this.ensureMember({ projectId, userId })
    return this.core.data.projectMember.delete({ where: { projectId_userId: { projectId, userId } } })
  }

  private async getProjectMember({ projectId, userId }: { projectId: string; userId: string }) {
    return this.core.data.projectMember.findUnique({ where: { projectId_userId: { projectId, userId } } })
  }

  private async getProjectMembers({ projectId }: { projectId: string }) {
    return this.core.data.projectMember.findMany({ where: { projectId } })
  }

  private async getProjectMembersManager({ projectId }: { projectId: string }) {
    const members = await this.getProjectMembers({ projectId })

    return (members ?? []).map((i) => i.role === ProjectRole.Manager)
  }
}
