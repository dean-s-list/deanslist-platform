import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { CommunityMember } from './community-member.entity'

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
  @Field(() => [CommunityMember], { nullable: true })
  members?: CommunityMember[]
  @HideField()
  projects?: unknown[]
}
