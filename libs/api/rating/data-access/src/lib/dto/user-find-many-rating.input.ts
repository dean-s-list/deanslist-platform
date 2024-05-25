import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserFindManyRatingInput {
  @Field({ nullable: true })
  search?: string
}
