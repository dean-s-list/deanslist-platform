import { ApiUserService } from '@deanslist-platform/api-user-data-access'
import { Controller, Get } from '@nestjs/common'

@Controller('users')
export class ApiUserAnonController {
  constructor(private readonly service: ApiUserService) {}

  @Get('identity-map')
  anonGetUserMap() {
    return this.service.anon.anonGetUserMap()
  }
}
