import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ApiUserEventService {
  constructor(private readonly core: ApiCoreService) {}
}
