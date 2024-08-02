import {
  ApiProjectService,
  getProjectAmountTotalUsdLeft,
  getRemainingDays,
  Project,
  ProjectMember,
  ProjectMessage,
  ProjectRole,
} from '@deanslist-platform/api-project-data-access'
import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Project as PrismaProject, ProjectMember as PrismaProjectMember } from '@prisma/client'

@Resolver(() => Project)
export class ApiProjectResolver {
  constructor(private readonly service: ApiProjectService) {}
  @ResolveField(() => Int, { nullable: true })
  amountTotalUsdLeft(@Parent() project: Project) {
    const members = (project.members ?? []) as PrismaProjectMember[]

    return getProjectAmountTotalUsdLeft(project as PrismaProject, members)
  }

  @ResolveField(() => [ProjectMember], { nullable: true })
  managers(@Parent() project: Project) {
    return project.members?.filter((i) => i.role === ProjectRole.Manager)
  }

  @ResolveField(() => [ProjectMember], { nullable: true })
  reviewers(@Parent() project: Project) {
    return project.members?.filter((i) => i.role === ProjectRole.Reviewer)
  }

  @ResolveField(() => ProjectMember, { nullable: true })
  referral(@Parent() project: Project) {
    return project.members?.find((i) => i.role === ProjectRole.Referral)
  }

  @ResolveField(() => ProjectMessage, { nullable: true })
  message(@Parent() project: Project) {
    return this.service.data.getProjectMessage(project as PrismaProject)
  }

  @ResolveField(() => Int, { nullable: true })
  remainingDays(@Parent() project: Project) {
    return project.endDate ? getRemainingDays(project.endDate) : 0
  }

  @ResolveField(() => Int, { nullable: true })
  reviewCount(@Parent() project: Project) {
    const reviews = project.members?.map((x) => x.review).flat() ?? []
    const filtered = reviews.filter((r) => r?.comments?.length ?? 0 > 0)

    return filtered?.length ?? 0
  }

  @ResolveField(() => String)
  manageUrl(@Parent() project: Project) {
    return `/manager/projects/${project.id}`
  }

  @ResolveField(() => String)
  viewUrl(@Parent() project: Project) {
    return `/projects/${project.id}`
  }
}
