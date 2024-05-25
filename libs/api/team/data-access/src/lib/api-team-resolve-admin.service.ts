import { Injectable } from '@nestjs/common'
import { ApiTeamDataService } from './api-team-data.service'
import { AdminFindManyTeamInput } from './dto/admin-find-many-team.input'
import { TeamPaging } from './entity/team-paging.entity'
import { getAdminTeamWhereInput } from './helpers/get-admin-team-where.input'

@Injectable()
export class ApiTeamResolveAdminService {
  constructor(private readonly data: ApiTeamDataService) {}

  async findManyTeam(input: AdminFindManyTeamInput): Promise<TeamPaging> {
    return this.data.findManyTeam({
      orderBy: { createdAt: 'desc' },
      where: getAdminTeamWhereInput(input),
      limit: input.limit ?? 10,
      page: input.page ?? 1,
    })
  }
}
