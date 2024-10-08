import { User } from '@deanslist-platform/api-user-data-access'
import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-scalars'
import { IdentityChallenge } from './identity-challenge.entity'
import { IdentityProvider } from './identity-provider.enum'

@ObjectType()
export class Identity {
  @Field()
  id!: string
  @Field()
  createdAt!: Date
  @Field()
  updatedAt!: Date

  @Field(() => IdentityProvider)
  provider!: IdentityProvider
  @Field()
  providerId!: string
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  primary!: boolean
  @Field(() => GraphQLJSON, { nullable: true })
  profile?: JSON
  @Field({ nullable: true })
  verified?: boolean
  @Field(() => User, { nullable: true })
  owner?: User
  @Field(() => [IdentityChallenge], { nullable: true })
  challenges?: IdentityChallenge[]
  @HideField()
  accessToken?: string
  @HideField()
  refreshToken?: string
}
