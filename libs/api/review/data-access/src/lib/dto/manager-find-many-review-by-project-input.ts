import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ManagerFindManyReviewByProjectInput {
  @Field()
  projectId!: string
  @Field({ nullable: true })
  search?: string
}
