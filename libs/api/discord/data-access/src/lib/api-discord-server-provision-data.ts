import { Prisma } from '@prisma/client'

export const provisionDiscordServers: Prisma.DiscordServerCreateInput[] = [
  {
    id: '1083213946078625853', // PubKey Dev
    createChannels: true,
    logChannelId: '1210909991947599932',
    projectCategoryId: '1210928640880152657',
    communityCategoryId: '1211186394840698951',
    channels: {
      create: [
        { id: '1211220731002884176', communities: { connect: { id: 'pubkey' } } },
        {
          id: '1211343686135193711',
          projects: { connect: { communityId_slug: { communityId: 'pubkey', slug: 'pubkey-link' } } },
        },
      ],
    },
  },
  {
    id: '1187522687531233381', // DL DEV TWO
    createChannels: true,
    projectCategoryId: '1210928748061270067',
    communityCategoryId: '1211186637174870086',
    channels: {
      create: [
        { id: '1211220736170266624', communities: { connect: { id: 'pubkey' } } },
        {
          id: '1211343693223821393',
          projects: { connect: { communityId_slug: { communityId: 'pubkey', slug: 'pubkey-link' } } },
        },
      ],
    },
  },
]
