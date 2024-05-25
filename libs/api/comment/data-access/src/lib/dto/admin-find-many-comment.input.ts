import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminFindManyCommentInput {
  @Field()
  reviewId!: string
  @Field({ nullable: true })
  search?: string
}
