import { Team } from '@deanslist-platform/api-team-data-access'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Project {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => Team, { nullable: true })
  team?: Team
  @Field()
  teamId!: string
  @Field()
  name!: string
  @Field()
  slug!: string
  @Field(() => Int, { nullable: true })
  duration?: number | null
  @Field({ nullable: true })
  startDate?: Date | null
  @Field({ nullable: true })
  avatarUrl?: string | null
}
