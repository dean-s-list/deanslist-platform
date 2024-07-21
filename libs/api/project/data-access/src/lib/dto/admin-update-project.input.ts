import { Field, InputType, Int } from '@nestjs/graphql'
import { ProjectStatus } from '../entity/project-status.enum'

@InputType()
export class AdminUpdateProjectInput {
  @Field({ nullable: true })
  communityId?: string
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  avatarUrl?: string
  @Field(() => Int, { nullable: true })
  durationDays?: number
  @Field({ nullable: true })
  startDate?: Date | null
  @Field(() => ProjectStatus, { nullable: true })
  status?: ProjectStatus
  @Field(() => Int, { nullable: true })
  amountManagerUsd?: number
  @Field(() => Int, { nullable: true })
  amountReferralUsd?: number
  @Field(() => Int, { nullable: true })
  amountTotalUsd?: number
  @Field({ nullable: true })
  reviewsOpen?: boolean
  @Field({ nullable: true })
  instructions?: string
  @Field({ nullable: true })
  linkDiscord?: string
  @Field({ nullable: true })
  linkGithub?: string
  @Field({ nullable: true })
  linkTelegram?: string
  @Field({ nullable: true })
  linkTwitter?: string
  @Field({ nullable: true })
  linkWebsite?: string
}
