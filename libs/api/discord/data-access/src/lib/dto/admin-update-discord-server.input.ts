import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateDiscordServerInput {
  @Field({ nullable: true })
  createChannels?: boolean
  @Field({ nullable: true })
  logChannelId?: string | null
  @Field({ nullable: true })
  projectCategoryId?: string | null
  @Field({ nullable: true })
  communityCategoryId?: string | null
}
