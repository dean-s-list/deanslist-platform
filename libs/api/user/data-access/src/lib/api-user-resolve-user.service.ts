import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { ApiUserDataService } from './api-user-data.service'
import { UserFindManyUserInput } from './dto/user-find-many-user.input'
import { UserUpdateUserInput } from './dto/user-update-user.input'
import { UserPaging } from './entity/user-paging.entity'
import { getUserUserWhereInput } from './helpers/get-user-user-where.input'

@Injectable()
export class ApiUserResolveUserService {
  constructor(private readonly core: ApiCoreService, private readonly data: ApiUserDataService) {}

  async findManyUser(input: UserFindManyUserInput): Promise<UserPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getUserUserWhereInput(input),
      limit: input.limit ?? 10,
      page: input.page ?? 1,
    })
  }

  async updateUser(userId: string, input: UserUpdateUserInput) {
    return this.data.updateUser(userId, input)
  }

  async findByUsername(username: string) {
    return this.data.findByUsername(username)
  }
}
