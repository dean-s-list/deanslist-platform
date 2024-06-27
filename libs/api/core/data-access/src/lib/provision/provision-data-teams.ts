import { ProjectStatus } from '@deanslist-platform/sdk'
import { Prisma } from '@prisma/client'

const avatarDeansList = 'https://avatars.githubusercontent.com/u/137821488?v=4'

export const provisionDataTeams: Prisma.TeamCreateInput[] = [
  {
    id: 'pubkey',
    avatarUrl: 'https://avatars.githubusercontent.com/u/125477168?v=4',
    name: 'PubKey',
    homeServerId: '1083213946078625853',
    members: { create: { userId: 'beeman.dev', admin: true } },
    projects: {
      create: [
        {
          slug: 'pubkey-link',
          name: 'PubKey Link',
          avatarUrl: 'https://avatars.githubusercontent.com/u/125477168?v=4',
          managers: { connect: [{ id: 'beeman.dev' }] },
          amountTotalUsd: 750,
          amountManagerUsd: 300,
          amountReferralUsd: 0,
          duration: 2,
          startDate: new Date(),
          status: ProjectStatus.Active,
          tags: ['nfts', 'identity'],
          instructions: `1. Go to [app.triadfi.co](https://app.triadfi.co) to get started.
2. Connect your wallet.
3. Use the app and create positions.
`,
        },
        {
          slug: 'tokengator',
          name: 'TokenGator',
          avatarUrl: 'https://pbs.twimg.com/profile_images/1765234913895190528/tmK-fd4K_400x400.jpg',
          managers: { connect: [{ id: 'beeman.dev' }] },
          amountTotalUsd: 750,
          amountManagerUsd: 300,
          amountReferralUsd: 0,
          duration: 2,
          startDate: new Date(),
          status: ProjectStatus.Active,
          tags: ['nfts', 'daos'],
          instructions: `1. Go to [app.triadfi.co](https://app.triadfi.co) to get started.
2. Connect your wallet.
3. Use the app and create positions.
`,
        },
      ],
    },
  },
  {
    id: 'deanslist',
    name: `Dean's List`,
    homeServerId: '1187522687531233381',
    avatarUrl: avatarDeansList,
    members: {
      create: [
        { userId: 'beeman.dev', admin: true },
        { userId: 'parzicano', admin: true },
        { userId: 'scientistjoe', admin: true },
      ],
    },
    projects: {
      create: [
        {
          avatarUrl: 'https://pbs.twimg.com/profile_images/1764858894701015040/6lI5MAwe_400x400.jpg',
          name: 'Triad',
          slug: 'triad',
          managers: { connect: [{ id: 'beeman.dev' }, { id: 'parzicano' }, { id: 'scientistjoe' }] },
          amountTotalUsd: 1500,
          amountManagerUsd: 500,
          amountReferralUsd: 100,
          duration: 2,
          startDate: new Date(),
          status: ProjectStatus.Active,
          tags: ['defi', 'dapp'],
          instructions: `1. Go to [app.triadfi.co](https://app.triadfi.co) to get started.
2. Connect your wallet.
3. Use the app and create positions.
`,
          linkDiscord: 'https://discord.gg/triadfi',
          linkGithub: 'https://github.com/triadxyz',
          linkTwitter: 'https://x.com/triadfi',
          linkWebsite: 'https://triadfi.co/',
        },
      ],
    },
  },
  { id: 'gibwork', name: `Gib Work`, members: { create: { userId: 'beeman.dev', admin: true } } },
]
