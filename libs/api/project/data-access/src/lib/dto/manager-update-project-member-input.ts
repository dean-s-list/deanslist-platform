import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class ManagerUpdateProjectMemberInput {
  @Field(() => Int, { nullable: true })
  amount?: number
  @Field(() => Int, { nullable: true })
  bonus?: number
}
