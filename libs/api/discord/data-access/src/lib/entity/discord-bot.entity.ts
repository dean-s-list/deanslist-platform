import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DiscordBot {
  @Field()
  id!: string
  @Field()
  username!: string
  @Field({ nullable: true })
  avatarUrl?: string | null
  @Field({ nullable: true })
  inviteUrl?: string | null
  @Field({ nullable: true })
  manageUrl?: string | null
}
