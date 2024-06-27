import { useManagerGetDiscordServers } from '@deanslist-platform/web-discord-data-access'
import { useManagerFindOneCommunity } from '@deanslist-platform/web-community-data-access'
import { ManagerCommunityUiUpdateForm } from '@deanslist-platform/web-community-ui'
import { UiError, UiLoader } from '@pubkey-ui/core'

export function ManagerCommunitySettingsGeneralTab({ communityId }: { communityId: string }) {
  const { item, query, updateCommunity } = useManagerFindOneCommunity({ communityId })
  const { items: servers } = useManagerGetDiscordServers()
  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Community not found." />
  }

  return <ManagerCommunityUiUpdateForm community={item} servers={servers} submit={updateCommunity} />
}
