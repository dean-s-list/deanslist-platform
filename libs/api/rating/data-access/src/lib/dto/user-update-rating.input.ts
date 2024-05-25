import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateRatingInput {
  @Field({ nullable: true })
  content?: string
  @Field(() => Number, { nullable: true })
  rating?: number
}
