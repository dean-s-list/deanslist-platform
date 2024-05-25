import { PagingInput } from '@deanslist-platform/api-core-data-access'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminFindManyProjectInput extends PagingInput() {
  @Field({ nullable: true })
  teamId?: string
  @Field({ nullable: true })
  search?: string
}
