import { ApiCommunityService } from '@deanslist-platform/api-community-data-access'
import { addDays, ApiCoreService, setDateToStartOfDay, slugifyId } from '@deanslist-platform/api-core-data-access'
import { Injectable, Logger } from '@nestjs/common'
import { Prisma, Project } from '@prisma/client'
import { ApiProjectEventService } from './api-project-event.service'
import { ProjectMessage } from './entity/project-message.entity'
import { ProjectPaging } from './entity/project-paging.entity'
import { ProjectStatus } from './entity/project-status.enum'
import { ProjectCreatedEvent } from './event/project-created.event'
import { calculateProjectDates } from './helpers/calculate-project-dates'
import { calculateProjectRatings, getCommentRatings } from './helpers/calculate-project-ratings'
import { getProjectAmountUsd } from './helpers/get-project-amount-total-usd-left'

@Injectable()
export class ApiProjectDataService {
  private readonly logger = new Logger(ApiProjectDataService.name)
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

  async ensureProjectManager({ projectId, userId }: { projectId: string; userId: string }) {
    const found = await this.findOneProject(projectId)

    const isCommunityAdmin = !!found.community.managers?.find((p) => (p.userId = userId))?.admin
    const isManager = found.managers.some((p) => p.id === userId)
    if (!isCommunityAdmin && !isManager) {
      throw new Error(`You are not a project manager`)
    }
    return found
  }

  async ensureCommunityAdmin({ communityId, userId }: { communityId: string; userId: string }) {
    return this.community.data.ensureCommunityAdmin({ communityId, userId })
  }

  async ensureCommunityManager({ communityId, userId }: { communityId: string; userId: string }) {
    return this.community.data.ensureCommunityManager({ communityId, userId })
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
    const instructions = `
1. Go to [the app](#) to get started.
2. Connect your wallet.
3. Use the app.`.trim()

    const { durationDays, endDate, startDate } = calculateProjectDates({
      input: { durationDays: input.durationDays as number | null, startDate: input.startDate as Date | string | null },
    })

    const data: Prisma.ProjectCreateInput = {
      ...input,
      durationDays,
      endDate,
      startDate: startDate ?? addDays({ date: new Date(), days: durationDays ?? 7 }),
      slug,
      instructions,
      community: { connect: { id: communityId } },
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
    { include, where }: { include?: Prisma.ProjectInclude; where?: Omit<Prisma.ProjectWhereInput, 'id'> } = {
      include: {},
      where: {},
    },
  ) {
    const found = await this.core.data.project.findUnique({
      where: { id: projectId, ...where },
      include: { ...include, community: { include: { managers: true } }, managers: true },
    })
    if (!found) {
      throw new Error('Project not found')
    }
    return found
  }

  getProjectMessage(project: Project): ProjectMessage | undefined {
    const nextStatus = getNextStatus(project?.status)
    if (nextStatus) {
      return getStatusMessage({ project, nextStatus })
    }
    return undefined
  }

  async updateProject(projectId: string, input: Prisma.ProjectUpdateInput, allowStartDateInPast = false) {
    const found = await this.findOneProject(projectId)

    const projectDates =
      found.status === ProjectStatus.Draft || allowStartDateInPast
        ? calculateProjectDates({
            allowStartDateInPast,
            found,
            input: {
              durationDays: input.durationDays as number | null,
              startDate: input.startDate as Date | string | null,
            },
          })
        : {
            durationDays: found.durationDays,
            endDate: found.endDate,
            startDate: found.startDate,
          }

    return this.core.data.project.update({
      where: { id: found.id },
      data: { ...input, ...projectDates },
    })
  }

  async updateProjectStatus(projectId: string, nextStatus: ProjectStatus) {
    const found = await this.findOneProject(projectId)

    allowStatusTransition({ project: found, nextStatus })

    return this.core.data.project.update({
      where: { id: found.id },
      data: { status: nextStatus },
    })
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

  async splitByRating(projectId: string) {
    const project = await this.core.data.project.findUnique({
      where: { id: projectId },
      include: {
        reviews: {
          include: {
            comments: {
              include: { ratings: true },
            },
          },
        },
      },
    })
    if (!project) {
      throw new Error('Project not found')
    }
    const reviews = project.reviews ?? []

    // Get the amount of USDC available for reviews
    const available = getProjectAmountUsd(project)

    this.logger.verbose(`Available USDC: ${available}`)
    const ratingMap: Record<string, number> = {}

    for (const review of reviews) {
      ratingMap[review.id] = calculateProjectRatings(getCommentRatings(review.comments)) ?? 0
    }

    const totalRatingAmount = Object.values(ratingMap).reduce((acc, rating) => acc + rating, 0)

    const unit = 5
    const amountPerRating = Math.floor(available / totalRatingAmount / unit) * unit

    for (const [reviewId, rating] of Object.entries(ratingMap)) {
      const amount = Math.floor(amountPerRating * rating)
      await this.core.data.review.update({ where: { id: reviewId }, data: { amount, bonus: 0 } })
      this.logger.verbose(`Updating review ${reviewId} with amount ${amount}`)
    }
  }
}

function allowStatusTransition({ project, nextStatus }: { project: Project; nextStatus: ProjectStatus }) {
  const { message } = getStatusMessage({ project, nextStatus })

  if (message) {
    throw new Error(message)
  }
}

function getStatusMessage({ project, nextStatus }: { project: Project; nextStatus: ProjectStatus }): ProjectMessage {
  const today = setDateToStartOfDay(new Date()).getTime()
  const startDate = project.startDate ? new Date(project.startDate).getTime() : undefined
  const endDate = project.endDate ? new Date(project.endDate).getTime() : undefined

  // We can not transition to our current status
  if (project.status === nextStatus) {
    return { nextStatus: undefined, message: `Cannot transition to ${nextStatus.toString()}` }
  }

  // We can only transition from Draft to Active
  if (project.status === ProjectStatus.Draft) {
    if (nextStatus !== ProjectStatus.Active) {
      return { nextStatus, message: `Cannot transition from ${project.status} to ${nextStatus.toString()}` }
    }
  }

  if (nextStatus === ProjectStatus.Active) {
    // Current status must be Draft or Active
    if (project.status !== ProjectStatus.Draft && project.status !== ProjectStatus.Active) {
      return { nextStatus, message: `Cannot transition from ${project.status} to ${nextStatus.toString()}` }
    }
    // Project must have a startDate
    if (project.startDate === null) {
      return { nextStatus, message: `Start date must be set` }
    }
    // Project startDate must be today or in the future
    if (startDate && startDate < today) {
      return { nextStatus, message: `Start date must be today or in the future` }
    }
    // Project must have a duration
    if (project.durationDays <= 0) {
      return { nextStatus, message: `Duration must be greater than 0` }
    }
    // the amountTotalUsd must be greater than 0
    if (project.amountTotalUsd <= 0) {
      return { nextStatus, message: `Amount total USD must be greater than 0` }
    }

    // If all the checks pass, return the next status
    return { nextStatus }
  }

  if (nextStatus === ProjectStatus.Closed) {
    // We can only close an Active project
    if (project.status !== ProjectStatus.Active) {
      return {
        nextStatus,
        message: `Cannot transition to Closed from ${project.status.toString()}`,
      }
    }
    // Project endDate must be in the future
    if (endDate && endDate > today) {
      return { nextStatus, message: `End date must be in the future` }
    }
    // If all the checks pass, return the next status
    return { nextStatus }
  }

  return { nextStatus }
}

function getNextStatus(status: ProjectStatus) {
  switch (status) {
    case ProjectStatus.Draft:
      return ProjectStatus.Active
    case ProjectStatus.Active:
      return ProjectStatus.Closed
    case ProjectStatus.Closed:
      return undefined
  }
}
