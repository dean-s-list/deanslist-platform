import { ApiCoreService, slugifyUsername } from '@deanslist-platform/api-core-data-access'
import { Injectable, Logger } from '@nestjs/common'
import { User as PrismaUser } from '@prisma/client'
import { ApiUserDataService } from './api-user-data.service'
import { AdminCreateUserInput } from './dto/admin-create-user.input'
import { AdminFindManyUserInput } from './dto/admin-find-many-user.input'
import { AdminUpdateUserInput } from './dto/admin-update-user.input'
import { UserPaging } from './entity/user-paging.entity'
import { getAdminUserWhereInput } from './helpers/get-admin-user-where.input'

@Injectable()
export class ApiUserDataAdminService {
  private readonly logger = new Logger(ApiUserDataAdminService.name)
  constructor(private readonly core: ApiCoreService, private readonly data: ApiUserDataService) {}

  async createUser(input: AdminCreateUserInput): Promise<PrismaUser> {
    return this.data.createUser(input)
  }

  async deleteUser(userId: string): Promise<boolean> {
    return this.data.deleteUser(userId)
  }

  async findManyUser(input: AdminFindManyUserInput): Promise<UserPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getAdminUserWhereInput(input),
      include: { identities: { orderBy: [{ provider: 'asc' }, { providerId: 'asc' }] } },
      limit: input.limit ?? 10,
      page: input.page ?? 1,
    })
  }

  async findById(userId: string): Promise<PrismaUser> {
    return this.data.findById(userId)
  }

  async updateUser(userId: string, input: AdminUpdateUserInput): Promise<PrismaUser> {
    const exists = await this.findById(userId)

    if (!exists) {
      throw new Error(`User ${userId} not found`)
    }

    const newUsername = input.username ? slugifyUsername(input.username) : undefined
    if (newUsername && newUsername !== slugifyUsername(exists.username)) {
      const exists = await this.core.data.user.findUnique({
        where: { username: newUsername },
      })
      if (exists) {
        throw new Error(`User ${newUsername} already exists`)
      }
      this.logger.verbose(`Updating username ${userId} to ${newUsername}`)
    }

    return this.data.updateUser(userId, { ...input, username: newUsername })
  }
}
