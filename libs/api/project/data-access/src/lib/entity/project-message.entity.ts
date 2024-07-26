import { Field, ObjectType } from '@nestjs/graphql'
import { ProjectStatus } from './project-status.enum'

@ObjectType()
export class ProjectMessage {
  @Field({ nullable: true })
  message?: string | null
  @Field(() => ProjectStatus, { nullable: true })
  nextStatus?: ProjectStatus
}
