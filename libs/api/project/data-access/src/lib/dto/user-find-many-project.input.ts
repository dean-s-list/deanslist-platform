import { PagingInput } from '@deanslist-platform/api-core-data-access'
import { Field, InputType } from '@nestjs/graphql'
import { ProjectStatus } from '../entity/project-status.enum'

@InputType()
export class UserFindManyProjectInput extends PagingInput() {
  @Field({ nullable: true })
  teamId?: string
  @Field({ nullable: true })
  search?: string
  @Field(() => ProjectStatus, { nullable: true })
  status?: ProjectStatus
}
