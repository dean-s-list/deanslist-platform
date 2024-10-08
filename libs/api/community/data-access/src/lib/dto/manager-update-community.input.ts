import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ManagerUpdateCommunityInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  avatarUrl?: string
  @Field({ nullable: true })
  homeServerId?: string
}
