import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class UserUpdateProjectInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  avatarUrl?: string | null
  @Field(() => Int, { nullable: true })
  duration?: number
  @Field({ nullable: true })
  startDate?: Date
}
