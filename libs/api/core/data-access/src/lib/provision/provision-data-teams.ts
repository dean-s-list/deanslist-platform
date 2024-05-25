import { Prisma } from '@prisma/client'

const avatarDeansList = 'https://avatars.githubusercontent.com/u/137821488?v=4'

export const provisionDataTeams: Prisma.TeamCreateInput[] = [
  {
    id: 'pubkey',
    avatarUrl: 'https://avatars.githubusercontent.com/u/125477168?v=4',
    name: 'PubKey',
    homeServerId: '1083213946078625853',
    members: { create: { userId: 'beemandev', admin: true } },
    projects: {
      create: [
        {
          slug: 'pubkey-link',
          name: 'PubKey Link',
          avatarUrl: 'https://avatars.githubusercontent.com/u/125477168?v=4',
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
        { userId: 'beemandev', admin: true },
        { userId: 'parzicano', admin: true },
        { userId: 'scientistjoe', admin: true },
      ],
    },
    projects: {
      create: [
        {
          avatarUrl: 'https://pbs.twimg.com/profile_images/1659266532898218005/dAQyCgCC_400x400.jpg',
          name: 'Fluxbot',
          slug: 'fluxbot',
        },
        {
          avatarUrl: 'https://pbs.twimg.com/profile_images/1712746410381336576/K65p1JZl_400x400.jpg',
          name: 'Kizzy',
          slug: 'kizzy',
        },
        {
          avatarUrl: avatarDeansList,
          name: 'Cliq',
          slug: 'cliq',
        },
        {
          avatarUrl: 'https://pbs.twimg.com/profile_images/1370398768974159886/VtSFD9w8_400x400.jpg',
          name: 'Friday',
          slug: 'friday',
        },
        {
          avatarUrl: avatarDeansList,
          name: 'Guardian AI',
          slug: 'guardian-ai',
        },
        {
          avatarUrl: avatarDeansList,
          name: 'Geoverse',
          slug: 'geoverse',
        },
        {
          avatarUrl: avatarDeansList,
          name: 'Luxhaus',
          slug: 'luxhaus',
        },
      ],
    },
  },
  { id: 'gibwork', name: `Gib Work`, members: { create: { userId: 'beemandev', admin: true } } },
]
