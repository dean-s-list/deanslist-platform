import { ApiCommunityService } from '@deanslist-platform/api-community-data-access'
import { ApiCoreService, slugifyId } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiProjectEventService } from './api-project-event.service'
import { ProjectPaging } from './entity/project-paging.entity'
import { ProjectCreatedEvent } from './event/project-created.event'

@Injectable()
export class ApiProjectDataService {
  constructor(
    private readonly core: ApiCoreService,
    private readonly event: ApiProjectEventService,
    private readonly community: ApiCommunityService,
  ) {}

  async ensureProjectAdmin({ projectId, userId }: { projectId: string; userId: string }) {
    const found = await this.findOneProject(projectId)
    await this.ensureCommunityAdmin({ communityId: found.communityId, userId })
    return found
  }

  async ensureCommunityAdmin({ communityId, userId }: { communityId: string; userId: string }) {
    return this.community.data.ensureCommunityAdmin({ communityId, userId })
  }

  async createProject(
    userId: string,
    { communityId, ...input }: Omit<Prisma.ProjectCreateWithoutCommunityInput, 'slug'> & { communityId: string },
  ): Promise<ProjectCreatedEvent['project']> {
    const name = input.name.trim()
    const slug = slugifyId(name, true)

    const [foundName, foundSlug] = await Promise.all([
      this.core.data.project.findUnique({ where: { communityId_name: { communityId, name } } }),
      this.core.data.project.findUnique({ where: { communityId_slug: { communityId, slug } } }),
    ])

    if (foundName) {
      throw new Error('Project with this name already exists')
    }
    if (foundSlug) {
      throw new Error('Project with this slug already exists')
    }
    const community = await this.core.data.community.findUnique({ where: { id: communityId } })

    if (!community) {
      throw new Error('Community ${communityId} not found')
    }

    const data: Prisma.ProjectCreateInput = {
      ...input,
      slug,
      community: { connect: { id: communityId } },
      avatarUrl: community.avatarUrl ?? undefined,
      managers: { connect: { id: userId } },
    }

    const project = await this.core.data.project.create({ data, include: { community: true } })

    this.event.emitProjectCreated({ project, userId })

    return project
  }

  async deleteProject(userId: string, projectId: string) {
    const found = await this.findOneProject(projectId)

    const project = await this.core.data.project.delete({
      where: { id: found.id },
      include: {
        channels: true,
        community: true,
      },
    })

    this.event.emitProjectDeleted({ project, userId })

    return !!project
  }

  async findManyProject({
    limit,
    page,
    ...args
  }: Prisma.ProjectFindManyArgs & { limit: number; page: number }): Promise<ProjectPaging> {
    return this.core.data.project
      .paginate(args)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneProject(
    projectId: string,
    include: Prisma.ProjectInclude = {},
    where: Omit<Prisma.ProjectWhereInput, 'id'> = {},
  ) {
    const found = await this.core.data.project.findUnique({
      where: { id: projectId, ...where },
      include: { community: true, managers: true, ...include },
    })
    if (!found) {
      throw new Error('Project not found')
    }
    return found
  }

  async updateProject(userId: string, projectId: string, data: Prisma.ProjectUpdateInput) {
    const found = await this.findOneProject(projectId)

    return this.core.data.project.update({ where: { id: found.id }, data })
  }

  async addProjectManager(userId: string, projectId: string, managerUserId: string) {
    const added = await this.core.data.project.update({
      where: { id: projectId },
      data: { managers: { connect: { id: managerUserId } } },
    })
    // TODO: Emit events, announce in Discord.
    return !!added
  }

  async removeProjectManager(userId: string, projectId: string, managerUserId: string) {
    const project = await this.findOneProject(projectId)
    const managerCount = project.managers?.length ?? 0
    if (managerCount === 1) {
      throw new Error('Cannot remove last project manager')
    }
    const removed = await this.core.data.project.update({
      where: { id: projectId },
      data: { managers: { disconnect: { id: managerUserId } } },
    })
    // TODO: Emit events, announce in Discord.
    return !!removed
  }

  async addProjectReviewer(userId: string, projectId: string, reviewerUserId: string) {
    const added = await this.core.data.project.update({
      where: { id: projectId },
      data: { reviewers: { connect: { id: reviewerUserId } } },
    })
    // TODO: Emit events, announce in Discord.
    return !!added
  }

  async removeProjectReviewer(userId: string, projectId: string, reviewerUserId: string) {
    const removed = await this.core.data.project.update({
      where: { id: projectId },
      data: { reviewers: { disconnect: { id: reviewerUserId } } },
    })
    // TODO: Emit events, announce in Discord.
    return !!removed
  }

  async addProjectReferral(userId: string, projectId: string, referralUserId: string) {
    const added = await this.core.data.project.update({
      where: { id: projectId },
      data: { referral: { connect: { id: referralUserId } } },
    })
    // TODO: Emit events, announce in Discord.
    return !!added
  }

  async removeProjectReferral(userId: string, projectId: string, referralUserId: string) {
    const removed = await this.core.data.project.update({
      where: { id: projectId },
      data: { referral: { disconnect: { id: referralUserId } } },
    })
    // TODO: Emit events, announce in Discord.
    return !!removed
  }
}
