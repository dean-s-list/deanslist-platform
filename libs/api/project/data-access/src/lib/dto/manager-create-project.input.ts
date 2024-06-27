import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class ManagerCreateProjectInput {
  @Field()
  teamId!: string
  @Field()
  name!: string
  @Field(() => Int, { nullable: true })
  duration?: number
  @Field({ nullable: true })
  startDate?: Date
}
