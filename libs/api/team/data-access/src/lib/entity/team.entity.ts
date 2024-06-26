import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { TeamMember } from './team-member.entity'

@ObjectType()
export class Team {
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
  @Field(() => [TeamMember], { nullable: true })
  members?: TeamMember[]
  @HideField()
  projects?: unknown[]
}
