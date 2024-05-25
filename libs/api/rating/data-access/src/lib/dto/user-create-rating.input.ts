import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateRatingInput {
  @Field()
  commentId!: string
  @Field({ nullable: true })
  content?: string
  @Field(() => Number)
  rating!: number
}
