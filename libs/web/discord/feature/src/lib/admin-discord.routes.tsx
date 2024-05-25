import { useRoutes } from 'react-router-dom'
import { AdminDiscordBotFeature } from './admin-discord-bot-feature'

export default function AdminDiscordRoutes() {
  return useRoutes([
    {
      index: true,
      element: <AdminDiscordBotFeature />,
    },
  ])
}
