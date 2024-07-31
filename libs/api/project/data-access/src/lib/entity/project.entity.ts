import { Community } from '@deanslist-platform/api-community-data-access'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ProjectMember } from './project-member.entity'
import { ProjectStatus } from './project-status.enum'

@ObjectType()
export class Project {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => Community, { nullable: true })
  community?: Community
  @Field()
  communityId!: string
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
  @Field({ nullable: true })
  reviewsOpen?: boolean
  @Field(() => ProjectStatus, { nullable: true })
  status!: ProjectStatus
  @Field(() => Int, { nullable: true })
  durationDays!: number
  @Field({ nullable: true })
  startDate?: Date | null
  @Field({ nullable: true })
  endDate?: Date | null
  @Field({ nullable: true })
  avatarUrl?: string | null
  @Field(() => [ProjectMember], { nullable: true })
  members?: ProjectMember[]
}
