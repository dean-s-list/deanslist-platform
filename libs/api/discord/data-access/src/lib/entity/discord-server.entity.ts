import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DiscordServer {
  @Field()
  id!: string
  @Field()
  name!: string
  @Field({ nullable: true })
  avatarUrl?: string | null
  @Field(() => [String], { nullable: true })
  permissions?: string[] | null
  @Field({ nullable: true })
  createChannels?: boolean
  @Field({ nullable: true })
  logChannelId?: string
  @Field({ nullable: true })
  projectCategoryId?: string | null
  @Field({ nullable: true })
  communityCategoryId?: string | null
}
