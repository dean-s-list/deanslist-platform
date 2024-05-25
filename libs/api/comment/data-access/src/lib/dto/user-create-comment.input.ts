import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateCommentInput {
  @Field()
  reviewId!: string
  @Field()
  content!: string
  @Field({ nullable: true })
  parentId?: string
}
