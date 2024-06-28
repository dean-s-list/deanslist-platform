import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ManagerUpdateRatingInput {
  @Field({ nullable: true })
  content?: string
  @Field(() => Number, { nullable: true })
  rating?: number
}
