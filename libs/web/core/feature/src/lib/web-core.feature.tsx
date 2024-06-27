import { AuthProvider } from '@deanslist-platform/web-auth-data-access'
import { SdkProvider } from '@deanslist-platform/web-core-data-access'
import { CoreUiThemeProvider } from '@deanslist-platform/web-core-ui'
import { SolanaClusterProvider } from '@deanslist-platform/web-solana-data-access'
import { toastError } from '@pubkey-ui/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Core styles
import '@mantine/core/styles.css'
// Package styles
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
// Web styles
import '@mantine/tiptap/styles.css'
import 'mantine-datatable/styles.layer.css'
import { BrowserRouter } from 'react-router-dom'
import { ShellRoutes } from './shell.routes'

const client = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: () => {
        toastError(`Something went wrong`)
      },
    },
  },
})

export function WebCoreFeature() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <SdkProvider>
          <AuthProvider>
            <CoreUiThemeProvider>
              <SolanaClusterProvider autoConnect={true}>
                <ShellRoutes />
              </SolanaClusterProvider>
            </CoreUiThemeProvider>
          </AuthProvider>
        </SdkProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
