import { Project } from '@deanslist-platform/sdk'
import { ActionIcon, Group } from '@mantine/core'
import {
  IconBrandDiscordFilled,
  IconBrandGithubFilled,
  IconBrandTelegram,
  IconBrandX,
  IconWorld,
} from '@tabler/icons-react'
import { ComponentType } from 'react'
import { Link } from 'react-router-dom'

export function ProjectUiSocials({ item }: { item: Project }) {
  return (
    <Group>
      <ProjectUiSocialLink base="https://" link={item.linkWebsite} icon={IconWorld} />
      <ProjectUiSocialLink base="https://x.com/" link={item.linkTwitter} icon={IconBrandX} />
      <ProjectUiSocialLink base="https://discord.gg/" link={item.linkDiscord} icon={IconBrandDiscordFilled} />
      <ProjectUiSocialLink base="https://github.com/" link={item.linkGithub} icon={IconBrandGithubFilled} />
      <ProjectUiSocialLink base="https://t.me/" link={item.linkTelegram} icon={IconBrandTelegram} />
    </Group>
  )
}

export function ProjectUiSocialLink({
  base,
  link = '',
  icon: Icon,
}: {
  base: string
  link?: string | null
  icon: ComponentType<{ size?: number; stroke?: number }>
}) {
  if (!link?.startsWith('https://')) {
    return null
  }
  if (!link?.startsWith(base)) {
    return null
  }

  return (
    <ActionIcon
      variant="light"
      color="brand"
      size="xl"
      radius="xl"
      component={Link}
      to={link}
      target="_blank"
      rel="noreferrer"
    >
      <Icon size={24} />
    </ActionIcon>
  )
}
