import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateCommentInput {
  @Field({ nullable: true })
  content?: string
}
