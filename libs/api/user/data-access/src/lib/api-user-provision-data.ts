import { IdentityProvider, Prisma, UserRole, UserStatus } from '@prisma/client'

export const provisionUsers: Prisma.UserCreateInput[] = [
  {
    username: 'alice',
    password: 'password',
    role: UserRole.Admin,
    developer: true,
    identities: {
      create: [
        {
          provider: IdentityProvider.Solana,
          providerId: 'ALiC98dw6j47Skrxje3zBN4jTA11w67JRjQRBeZH3BRG',
          verified: true,
        },
      ],
    },
  },
  {
    username: 'bob',
    password: 'password',
    role: UserRole.User,
  },
  // Charlie is a user with no password, so they can only log in with an external provider
  {
    username: 'charlie',
    role: UserRole.User,
  },
  // Dave is set to inactive, so they can't log in
  {
    username: 'dave',
    password: 'password',
    role: UserRole.User,
    status: UserStatus.Inactive,
  },
  {
    username: 'beeman.dev',
    avatarUrl: 'https://avatars.githubusercontent.com/u/36491',
    name: 'beeman',
    role: UserRole.Admin,
    developer: true,
    identities: {
      create: [
        { provider: IdentityProvider.Discord, providerId: '386584531353862154' },
        {
          provider: IdentityProvider.Solana,
          providerId: 'BEEMANPx2jdmfR7jpn1hRdMuM2Vj4E3azBLb6RUBrCDY',
          verified: true,
        },
      ],
    },
  },
]
