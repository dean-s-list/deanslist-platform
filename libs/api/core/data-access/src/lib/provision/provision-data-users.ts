import { IdentityProvider, Prisma, UserRole, UserStatus } from '@prisma/client'

export const provisionDataUsers: Prisma.UserCreateInput[] = [
  {
    username: 'alice',
    password: 'password',
    role: UserRole.Admin,
    developer: true,
    identities: {
      create: [{ provider: IdentityProvider.Solana, providerId: 'ALiC98dw6j47Skrxje3zBN4jTA11w67JRjQRBeZH3BRG' }],
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
    username: 'beemandev',
    avatarUrl: 'https://avatars.githubusercontent.com/u/36491',
    name: 'beeman',
    role: UserRole.Admin,
    developer: true,
    identities: {
      create: [
        { provider: IdentityProvider.Discord, providerId: '386584531353862154' },
        { provider: IdentityProvider.Solana, providerId: 'BEEMANPx2jdmfR7jpn1hRdMuM2Vj4E3azBLb6RUBrCDY' },
      ],
    },
  },
  {
    username: 'parzicano',
    role: UserRole.Admin,
    developer: true,
    avatarUrl: 'https://cdn.discordapp.com/avatars/890501255653380136/db98f62ac66dba63d48638e188cf3ee9.png?size=128',
    identities: {
      create: [
        { provider: IdentityProvider.Discord, providerId: '890501255653380136' },
        { provider: IdentityProvider.Solana, providerId: '8m95q25FsDw1FpUBVvpk1WfUnSWzPamyY7jW3MitQXu6' },
      ],
    },
  },
  {
    username: 'scientistjoe',
    role: UserRole.Admin,
    developer: true,
    avatarUrl: 'https://cdn.discordapp.com/avatars/828022302221271101/c883f1e1fc6c93e88770b62ae014cb94.webp',
    identities: {
      create: [
        { provider: IdentityProvider.Discord, providerId: '828022302221271101' },
        { provider: IdentityProvider.Solana, providerId: 'CLcXVZpCwF9QH2aNjFhPSzyeUVifkP9W88WHwfe6sMww' },
      ],
    },
  },
]
