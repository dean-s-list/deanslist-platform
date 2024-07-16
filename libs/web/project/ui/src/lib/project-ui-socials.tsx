import { Project } from '@deanslist-platform/sdk'
import { ActionIcon, Group, Text } from '@mantine/core'
import {
  IconBrandDiscordFilled,
  IconBrandGithubFilled,
  IconBrandTelegram,
  IconBrandX,
  IconWorld,
} from '@tabler/icons-react'
import { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { UiStack } from '@pubkey-ui/core'

export function ProjectUiSocials({ item }: { item: Project }) {
  const hasLinks = item.linkWebsite || item.linkTwitter || item.linkDiscord || item.linkGithub || item.linkTelegram

  if (!hasLinks) {
    return null
  }

  return (
    <UiStack>
      <Text>Do you have any questions? Find the team at:</Text>
      <Group>
        <ProjectUiSocialLink base="https://" link={item.linkWebsite} icon={IconWorld} />
        <ProjectUiSocialLink base="https://x.com/" link={item.linkTwitter} icon={IconBrandX} />
        <ProjectUiSocialLink base="https://discord.gg/" link={item.linkDiscord} icon={IconBrandDiscordFilled} />
        <ProjectUiSocialLink base="https://github.com/" link={item.linkGithub} icon={IconBrandGithubFilled} />
        <ProjectUiSocialLink base="https://t.me/" link={item.linkTelegram} icon={IconBrandTelegram} />
      </Group>
    </UiStack>
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
