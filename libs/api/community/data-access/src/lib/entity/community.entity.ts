import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { CommunityManager } from './community-manager.entity'

@ObjectType()
export class Community {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  name!: string
  @Field({ nullable: true })
  avatarUrl?: string | null
  @Field({ nullable: true })
  homeServerId?: string | null
  @Field(() => [CommunityManager], { nullable: true })
  managers?: CommunityManager[]
  @HideField()
  projects?: unknown[]
}
