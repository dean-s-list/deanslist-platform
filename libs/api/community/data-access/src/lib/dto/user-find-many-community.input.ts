import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@deanslist-platform/api-core-data-access'

@InputType()
export class UserFindManyCommunityInput extends PagingInput() {
  @Field({ nullable: true })
  search?: string
}
