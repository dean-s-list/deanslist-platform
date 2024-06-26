import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ManagerCreateTeamInput {
  @Field()
  name!: string
}
