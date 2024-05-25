import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminFindManyRatingInput {
  @Field({ nullable: true })
  commentId!: string
  @Field({ nullable: true })
  search?: string
}
