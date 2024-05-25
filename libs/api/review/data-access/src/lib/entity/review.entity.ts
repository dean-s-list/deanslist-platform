import { Project } from '@deanslist-platform/api-project-data-access'
import { User } from '@deanslist-platform/api-user-data-access'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Review {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => Project, { nullable: true })
  project?: Project
  @Field()
  projectId!: string
  @Field(() => User, { nullable: true })
  reviewer?: User
  @Field()
  reviewerId!: string
}
