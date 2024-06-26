import { Team } from '@deanslist-platform/api-team-data-access'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ProjectStatus } from './project-status.enum'

@ObjectType()
export class Project {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => Team, { nullable: true })
  team?: Team
  @Field()
  teamId!: string
  @Field()
  name!: string
  @Field()
  slug!: string
  @Field(() => ProjectStatus, { nullable: true })
  status!: ProjectStatus
  @Field(() => [String], { nullable: true })
  tags!: string[]
  @Field(() => Int, { nullable: true })
  duration?: number | null
  @Field({ nullable: true })
  startDate?: Date | null
  @Field({ nullable: true })
  avatarUrl?: string | null
}
