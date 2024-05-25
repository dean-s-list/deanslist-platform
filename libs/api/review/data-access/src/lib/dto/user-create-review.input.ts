import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateReviewInput {
  @Field()
  projectId!: string
}
