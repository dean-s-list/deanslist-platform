import { ProjectMember } from '@deanslist-platform/api-project-data-access'
import { Field, HideField, Int, ObjectType } from '@nestjs/graphql'
import { Comment, Rating } from '@prisma/client'

@ObjectType()
export class Review {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => Int, { nullable: true })
  amount?: number | null
  @Field(() => Int, { nullable: true })
  bonus?: number | null
  @Field(() => ProjectMember, { nullable: true })
  projectMember?: ProjectMember
  @Field()
  projectMemberId!: string
  @HideField()
  comments?: Comment & { ratings?: Rating[] }[]
}
