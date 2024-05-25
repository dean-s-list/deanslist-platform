import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DiscordChannel {
  @Field()
  id!: string
  @Field()
  name!: string
  @Field()
  type!: string
  @Field({ nullable: true })
  parentId!: string | null
  @Field({ nullable: true })
  guildId!: string | null
}
