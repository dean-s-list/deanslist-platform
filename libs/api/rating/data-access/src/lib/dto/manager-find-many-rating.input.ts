import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ManagerFindManyRatingInput {
  @Field({ nullable: true })
  search?: string
}
