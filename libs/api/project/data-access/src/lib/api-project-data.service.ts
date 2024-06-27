import { ApiCoreService, slugifyId } from '@deanslist-platform/api-core-data-access'
import { ApiTeamService } from '@deanslist-platform/api-team-data-access'
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
    private readonly team: ApiTeamService,
  ) {}

  async ensureProjectAdmin({ projectId, userId }: { projectId: string; userId: string }) {
    const found = await this.findOneProject(projectId)
    await this.ensureTeamAdmin({ teamId: found.teamId, userId })
    return found
  }

  async ensureTeamAdmin({ teamId, userId }: { teamId: string; userId: string }) {
    return this.team.data.ensureTeamAdmin({ teamId, userId })
  }

  async createProject(
    userId: string,
    { teamId, ...input }: Omit<Prisma.ProjectCreateWithoutTeamInput, 'slug'> & { teamId: string },
  ): Promise<ProjectCreatedEvent['project']> {
    const name = input.name.trim()
    const slug = slugifyId(name, true)

    const [foundName, foundSlug] = await Promise.all([
      this.core.data.project.findUnique({ where: { teamId_name: { teamId, name } } }),
      this.core.data.project.findUnique({ where: { teamId_slug: { teamId, slug } } }),
    ])

    if (foundName) {
      throw new Error('Project with this name already exists')
    }
    if (foundSlug) {
      throw new Error('Project with this slug already exists')
    }
    const team = await this.core.data.team.findUnique({ where: { id: teamId } })

    if (!team) {
      throw new Error('Team ${teamId} not found')
    }

    const data: Prisma.ProjectCreateInput = {
      ...input,
      slug,
      team: { connect: { id: teamId } },
      avatarUrl: team.avatarUrl ?? undefined,
    }

    const project = await this.core.data.project.create({ data, include: { team: true } })

    this.event.emitProjectCreated({ project, userId })

    return project
  }

  async deleteProject(userId: string, projectId: string) {
    const found = await this.findOneProject(projectId)

    const project = await this.core.data.project.delete({
      where: { id: found.id },
      include: {
        channels: true,
        team: true,
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
      include: { team: true, ...include },
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
    const removed = await this.core.data.project.update({
      where: { id: projectId },
      data: { managers: { disconnect: { id: managerUserId } } },
    })
    // TODO: Emit events, announce in Discord.
    return !!removed
  }

  async addProjectMember(userId: string, projectId: string, memberUserId: string) {
    const added = await this.core.data.project.update({
      where: { id: projectId },
      data: { members: { connect: { id: memberUserId } } },
    })
    // TODO: Emit events, announce in Discord.
    return !!added
  }

  async removeProjectMember(userId: string, projectId: string, memberUserId: string) {
    const removed = await this.core.data.project.update({
      where: { id: projectId },
      data: { members: { disconnect: { id: memberUserId } } },
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
