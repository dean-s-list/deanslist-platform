import { ApiCoreService, hashPassword, slugifyUsername } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { Prisma, User as PrismaUser } from '@prisma/client'
import { AdminUpdateUserInput } from './dto/admin-update-user.input'
import { UserUpdateUserInput } from './dto/user-update-user.input'
import { UserPaging } from './entity/user-paging.entity'

@Injectable()
export class ApiUserDataService {
  constructor(private readonly core: ApiCoreService) {}

  async createUser(input: Prisma.UserCreateInput): Promise<PrismaUser> {
    const username = slugifyUsername(input.username)
    if (!username.length) {
      throw new Error(`Username ${input.username} is not valid`)
    }
    const exists = await this.core.data.user.findUnique({
      where: { username: username },
    })
    if (exists) {
      throw new Error(`User ${username} already exists`)
    }
    return this.core.data.user.create({
      data: {
        ...input,
        username,
        password: input.password ? hashPassword(input.password) : undefined,
      },
    })
  }

  async deleteUser(userId: string): Promise<boolean> {
    const exists = await this.findById(userId)
    if (!exists) {
      throw new Error(`User ${userId} not found`)
    }

    const deleted = await this.core.data.user.delete({ where: { id: userId } })

    return !!deleted
  }

  async findById(userId: string): Promise<PrismaUser> {
    const found = await this.core.data.user.findUnique({
      where: { id: userId },
    })
    if (!found) {
      throw new Error(`User ${userId} not found`)
    }
    return found
  }

  async findByUsername(username: string) {
    const found = await this.core.data.user.findUnique({ where: { username } })

    if (!found) {
      throw new Error(`User ${username} not found`)
    }
    return found
  }

  async findMany({
    limit,
    page,
    ...args
  }: Prisma.UserFindManyArgs & { limit: number; page: number }): Promise<UserPaging> {
    return this.core.data.user
      .paginate(args)
      .withPages({ limit: limit ?? 10, page: page ?? 1 })
      .then(([data, meta]) => ({ data, meta }))
  }

  async updateUser(userId: string, input: AdminUpdateUserInput | UserUpdateUserInput) {
    return this.core.data.user.update({ where: { id: userId }, data: input })
  }
}
