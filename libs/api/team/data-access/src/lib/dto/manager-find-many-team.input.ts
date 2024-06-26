import { PagingInput } from '@deanslist-platform/api-core-data-access'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ManagerFindManyTeamInput extends PagingInput() {
  @Field({ nullable: true })
  search?: string
}
