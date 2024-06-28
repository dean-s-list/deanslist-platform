import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ReviewerFindManyCommentInput {
  @Field()
  reviewId!: string
  @Field({ nullable: true })
  search?: string
}
