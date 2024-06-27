import { Injectable } from '@nestjs/common'
import { ApiCommunityDataService } from './api-community-data.service'
import { AdminFindManyCommunityInput } from './dto/admin-find-many-community.input'
import { CommunityPaging } from './entity/community-paging.entity'
import { getAdminCommunityWhereInput } from './helpers/get-admin-community-where.input'

@Injectable()
export class ApiCommunityResolveAdminService {
  constructor(private readonly data: ApiCommunityDataService) {}

  async findManyCommunity(input: AdminFindManyCommunityInput): Promise<CommunityPaging> {
    return this.data.findManyCommunity({
      orderBy: { createdAt: 'desc' },
      where: getAdminCommunityWhereInput(input),
      limit: input.limit ?? 10,
      page: input.page ?? 1,
    })
  }
}
