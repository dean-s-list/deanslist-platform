import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ReviewerFindManyReviewByUsernameInput {
  @Field()
  username!: string
  @Field({ nullable: true })
  search?: string
}
