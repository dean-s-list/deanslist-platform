import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateCommentInput {
  @Field({ nullable: true })
  content?: string
}
