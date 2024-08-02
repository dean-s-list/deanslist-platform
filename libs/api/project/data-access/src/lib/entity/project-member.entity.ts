import { User } from '@deanslist-platform/api-user-data-access'
import { Field, HideField, Int, ObjectType } from '@nestjs/graphql'
import { Comment, Review } from '@prisma/client'
import { ProjectRole } from './project-role.enum'
import { Project } from './project.entity'

@ObjectType()
export class ProjectMember {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => ProjectRole, { nullable: true })
  role?: ProjectRole
  @Field(() => Int, { nullable: true })
  amount?: number
  @Field(() => Int, { nullable: true })
  bonus?: number
  @Field(() => Boolean, { nullable: true })
  referral?: boolean
  @Field(() => Project, { nullable: true })
  project?: Project
  @Field(() => String, { nullable: true })
  projectId?: string
  @Field(() => User, { nullable: true })
  user?: User
  @Field(() => String, { nullable: true })
  userId?: string
  @HideField()
  review?: Review & { comments?: Comment[] }[]
}
