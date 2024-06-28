import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ManagerFindManyCommentInput {
  @Field()
  projectId!: string
  @Field({ nullable: true })
  search?: string
}
