import { PagingInput } from '@deanslist-platform/api-core-data-access'
import { Field, InputType } from '@nestjs/graphql'
import { ProjectStatus } from '../entity/project-status.enum'
import { ProjectOrderBy } from './project-order-by'

@InputType()
export class ReviewerFindManyProjectInput extends PagingInput() {
  @Field({ nullable: true })
  communityId?: string
  @Field({ nullable: true })
  search?: string
  @Field(() => ProjectStatus, { nullable: true })
  status?: ProjectStatus
  @Field(() => ProjectOrderBy, { nullable: true })
  orderBy?: ProjectOrderBy
}
