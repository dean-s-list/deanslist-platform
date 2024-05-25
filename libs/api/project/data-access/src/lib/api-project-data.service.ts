import { ApiCoreService, slugifyId } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiProjectEventService } from './api-project-event.service'
import { ProjectPaging } from './entity/project-paging.entity'
import { ProjectCreatedEvent } from './event/project-created.event'

@Injectable()
export class ApiProjectDataService {
  constructor(private readonly core: ApiCoreService, private readonly event: ApiProjectEventService) {}

  async createProject(
    userId: string,
    { teamId, ...input }: Omit<Prisma.ProjectCreateWithoutTeamInput, 'slug'> & { teamId: string },
  ): Promise<ProjectCreatedEvent['project']> {
    const name = input.name.trim()
    const slug = slugifyId(name, true)

    const [foundName, foundFlug] = await Promise.all([
      this.core.data.project.findUnique({ where: { teamId_name: { teamId, name } } }),
      this.core.data.project.findUnique({ where: { teamId_slug: { teamId, slug } } }),
    ])

    if (foundName) {
      throw new Error('Project with this name already exists')
    }
    if (foundFlug) {
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

  async findOneProject(projectId: string) {
    const found = await this.core.data.project.findUnique({
      where: { id: projectId },
      include: { team: true },
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
}
