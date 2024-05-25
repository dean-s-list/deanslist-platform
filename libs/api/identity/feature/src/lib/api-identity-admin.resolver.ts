import { ApiAuthGraphQLAdminGuard } from '@deanslist-platform/api-auth-data-access'
import {
  AdminCreateIdentityInput,
  AdminFindManyIdentityInput,
  ApiIdentityService,
  Identity,
} from '@deanslist-platform/api-identity-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiIdentityAdminResolver {
  constructor(private readonly service: ApiIdentityService) {}

  @Mutation(() => Identity, { nullable: true })
  adminCreateIdentity(@Args('input') input: AdminCreateIdentityInput) {
    return this.service.admin.createIdentity(input)
  }
  @Mutation(() => Boolean, { nullable: true })
  adminDeleteIdentity(@Args('identityId') identityId: string) {
    return this.service.admin.deleteIdentity(identityId)
  }
  @Query(() => [Identity], { nullable: true })
  adminFindManyIdentity(@Args('input') input: AdminFindManyIdentityInput) {
    return this.service.admin.findManyIdentity(input)
  }
}
