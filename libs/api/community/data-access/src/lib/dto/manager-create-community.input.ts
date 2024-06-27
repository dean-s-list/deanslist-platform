import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ManagerCreateCommunityInput {
  @Field()
  name!: string
}
