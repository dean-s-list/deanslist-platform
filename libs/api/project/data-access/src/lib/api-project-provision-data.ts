import { Prisma, ProjectStatus } from '@prisma/client'

export type ProjectProvisionInput = Omit<Prisma.ProjectCreateWithoutCommunityInput, 'slug'> & {
  communityId: string
}

export const provisionProjects: ProjectProvisionInput[] = [
  {
    communityId: 'pubkey',
    name: 'PubKey Link',
    managers: { connect: [{ id: 'beeman.dev' }] },
    amountTotalUsd: 750,
    amountManagerUsd: 300,
    amountReferralUsd: 0,
    durationDays: 14,
    startDate: new Date(),
    status: ProjectStatus.Active,
    instructions: `1. Go to [app.triadfi.co](https://app.triadfi.co) to get started.
2. Connect your wallet.
3. Use the app and create positions.
`,
  },
  {
    communityId: 'pubkey',
    name: 'TokenGator',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1765234913895190528/tmK-fd4K_400x400.jpg',
    managers: { connect: [{ id: 'beeman.dev' }] },
    amountTotalUsd: 750,
    amountManagerUsd: 300,
    amountReferralUsd: 0,
    durationDays: 14,
    startDate: new Date(),
    status: ProjectStatus.Active,
    instructions: `1. Go to [app.triadfi.co](https://app.triadfi.co) to get started.
2. Connect your wallet.
3. Use the app and create positions.
`,
  },
  {
    communityId: 'deans-list',
    name: 'Dashboard v2',
    managers: { connect: [{ id: 'beeman.dev' }] },
    amountTotalUsd: 500,
    amountManagerUsd: 0,
    amountReferralUsd: 0,
    durationDays: 7,
    startDate: new Date(),
    status: ProjectStatus.Active,
  },
  {
    communityId: 'deans-list',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1764858894701015040/6lI5MAwe_400x400.jpg',
    name: 'Triad',
    managers: { connect: [{ id: 'beeman.dev' }] },
    amountTotalUsd: 1500,
    amountManagerUsd: 500,
    amountReferralUsd: 100,
    durationDays: 14,
    startDate: new Date(),
    status: ProjectStatus.Active,
    instructions: `1. Go to [app.triadfi.co](https://app.triadfi.co) to get started.
2. Connect your wallet.
3. Use the app and create positions.
`,
    linkDiscord: 'https://discord.gg/triadfi',
    linkGithub: 'https://github.com/triadxyz',
    linkTwitter: 'https://x.com/triadfi',
    linkWebsite: 'https://triadfi.co/',
  },
  {
    communityId: 'gib-work',
    name: 'FoSho',
    managers: { connect: [{ id: 'beeman.dev' }] },
    amountTotalUsd: 1500,
    amountManagerUsd: 500,
    amountReferralUsd: 100,
    durationDays: 14,
    startDate: new Date(),
    status: ProjectStatus.Active,
    instructions: `1. Go to the app to get started.
2. Connect your wallet.
3. Use the app and create content.
`,
  },
]
