import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ReviewerFindManyReviewByProjectInput {
  @Field()
  projectId!: string
  @Field({ nullable: true })
  search?: string
}
