import { Identity } from '@deanslist-platform/api-identity-data-access'
import { User, UserRole } from '@deanslist-platform/api-user-data-access'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => User)
export class ApiUserResolver {
  @ResolveField(() => String, { nullable: true })
  avatarUrl(@Parent() user: User) {
    return user.avatarUrl?.length ? user.avatarUrl : null
  }

  @ResolveField(() => Boolean, { nullable: true })
  manager(@Parent() user: User) {
    if (user.role === UserRole.Admin) {
      return true
    }
    return !!user.communities?.length || !!user.projectManagers?.length
  }

  @ResolveField(() => String)
  profileUrl(@Parent() user: User) {
    return ['/u', user.username].join('/')
  }

  @ResolveField(() => [Identity], { nullable: true })
  identities(@Parent() user: User) {
    return user.identities ?? []
  }
}
