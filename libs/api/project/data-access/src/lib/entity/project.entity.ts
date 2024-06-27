import { Team } from '@deanslist-platform/api-team-data-access'
import { User } from '@deanslist-platform/api-user-data-access'
import { Field, HideField, Int, ObjectType } from '@nestjs/graphql'
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
  @Field(() => [User], { nullable: true })
  managers?: User[]
  @Field(() => [User], { nullable: true })
  members?: User[]
  @Field(() => User, { nullable: true })
  referral?: User
  @Field()
  teamId!: string
  @Field()
  name!: string
  @Field()
  slug!: string
  @Field({ nullable: true })
  instructions?: string | null
  @Field({ nullable: true })
  linkDiscord?: string | null
  @Field({ nullable: true })
  linkGithub?: string | null
  @Field({ nullable: true })
  linkTelegram?: string | null
  @Field({ nullable: true })
  linkTwitter?: string | null
  @Field({ nullable: true })
  linkWebsite?: string | null
  @Field(() => Int, { nullable: true })
  amountManagerUsd?: number | null
  @Field(() => Int, { nullable: true })
  amountReferralUsd?: number | null
  @Field(() => Int, { nullable: true })
  amountTotalUsd?: number | null
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
  @HideField()
  reviews?: { comments?: unknown[] }[] | null
}
