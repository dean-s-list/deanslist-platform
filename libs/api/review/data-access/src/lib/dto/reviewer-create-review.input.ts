import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ReviewerCreateReviewInput {
  @Field()
  projectId!: string
}
