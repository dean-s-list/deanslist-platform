import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UserStatus } from '@prisma/client'
import { Request } from 'express-serve-static-core'
import { Strategy } from 'passport-jwt'

function cookieExtractor(req: Request & { cookies: Record<string, string> }) {
  const name = process.env['COOKIE_NAME'] as string
  return req?.cookies?.[name] ? req.cookies[name] : undefined
}

@Injectable()
export class ApiAuthStrategyJwt extends PassportStrategy(Strategy) {
  constructor(private readonly core: ApiCoreService) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: core.config.jwtSecret,
    })
  }

  async validate(payload: { id: string; username: string }) {
    if (!payload.id) {
      throw new UnauthorizedException()
    }
    const user = await this.core.data.user.findUnique({
      where: { id: payload.id },
      include: {
        communities: { select: { id: true, community: { select: { id: true } } } },
        identities: { where: { verified: true } },
        projectMembers: { select: { id: true, role: true } },
      },
    })

    if (!user) {
      throw new UnauthorizedException()
    }
    if (user.status === UserStatus.Inactive) {
      throw new UnauthorizedException()
    }
    return user
  }
}
