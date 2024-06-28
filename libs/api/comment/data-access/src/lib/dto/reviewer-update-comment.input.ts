import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ReviewerUpdateCommentInput {
  @Field({ nullable: true })
  content?: string
}
