import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateCommunityInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  avatarUrl?: string
  @Field({ nullable: true })
  homeServerId?: string
}
