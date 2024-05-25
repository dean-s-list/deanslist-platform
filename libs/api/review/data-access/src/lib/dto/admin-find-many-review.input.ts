import { PagingInput } from '@deanslist-platform/api-core-data-access'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminFindManyReviewInput extends PagingInput() {
  @Field()
  projectId!: string
  @Field({ nullable: true })
  search?: string
}
