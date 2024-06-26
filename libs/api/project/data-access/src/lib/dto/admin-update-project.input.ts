import { Field, InputType, Int } from '@nestjs/graphql'
import { ProjectStatus } from '../entity/project-status.enum'

@InputType()
export class AdminUpdateProjectInput {
  @Field({ nullable: true })
  teamId?: string
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  avatarUrl?: string
  @Field(() => Int, { nullable: true })
  duration?: number
  @Field({ nullable: true })
  startDate?: Date | null
  @Field(() => ProjectStatus, { nullable: true })
  status?: ProjectStatus
  @Field(() => [String], { nullable: true })
  tags!: string[]
}
