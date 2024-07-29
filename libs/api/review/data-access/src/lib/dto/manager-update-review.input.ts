import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class ManagerUpdateReviewInput {
  @Field(() => Int, { nullable: true })
  amount?: number
  @Field(() => Int, { nullable: true })
  bonus?: number
}
