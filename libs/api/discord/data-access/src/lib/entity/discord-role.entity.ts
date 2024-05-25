import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DiscordRole {
  @Field()
  id!: string
  @Field()
  name!: string
  @Field()
  managed!: boolean
  @Field(() => Int)
  color!: number
  @Field(() => Int)
  position!: number
}
