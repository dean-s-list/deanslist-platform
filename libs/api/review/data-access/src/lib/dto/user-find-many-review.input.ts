import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserFindManyReviewInput {
  @Field()
  projectId!: string
  @Field({ nullable: true })
  search?: string
}
