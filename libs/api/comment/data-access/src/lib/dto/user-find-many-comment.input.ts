import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserFindManyCommentInput {
  @Field()
  reviewId!: string
  @Field({ nullable: true })
  search?: string
}
