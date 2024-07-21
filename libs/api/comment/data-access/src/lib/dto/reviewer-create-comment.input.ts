import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ReviewerCreateCommentInput {
  @Field()
  reviewId!: string
  @Field()
  content!: string
  @Field({ nullable: true })
  parentId?: string
  @Field({ nullable: true })
  versionBrowser?: string
  @Field({ nullable: true })
  versionOs?: string
}
