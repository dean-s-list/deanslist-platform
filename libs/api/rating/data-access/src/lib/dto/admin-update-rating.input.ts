import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateRatingInput {
  @Field(() => Number)
  rating?: number
  @Field({ nullable: true })
  content?: string
}
