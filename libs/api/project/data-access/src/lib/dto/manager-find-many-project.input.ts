import { OrderDirection, PagingInput } from '@deanslist-platform/api-core-data-access'
import { Field, InputType } from '@nestjs/graphql'
import { ProjectOrderBy } from '../entity/project-order-by.enum'
import { ProjectStatus } from '../entity/project-status.enum'

@InputType()
export class ManagerFindManyProjectInput extends PagingInput() {
  @Field({ nullable: true })
  communityId?: string
  @Field({ nullable: true })
  search?: string
  @Field(() => ProjectStatus, { nullable: true })
  status?: ProjectStatus
  @Field(() => ProjectOrderBy, { nullable: true })
  orderBy?: ProjectOrderBy
  @Field(() => OrderDirection, { nullable: true })
  orderDirection?: OrderDirection
}
