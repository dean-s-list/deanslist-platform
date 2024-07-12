import { ColorSchemeScript, createTheme, DEFAULT_THEME, Loader, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { createContext, ReactNode, Suspense, useContext } from 'react'

// Import the mantine theme styles
import './ui-theme-styles'

const defaultTheme = createTheme({
  colors: {
    brand: DEFAULT_THEME.colors.violet,
  },
  primaryColor: 'brand',
  fontFamily: `Poppins, sans-serif`,
  headings: { fontFamily: 'Poppins, sans-serif' },
})

export interface CoreUiThemeProviderOptions {
  children: ReactNode
}

export interface CoreUiThemeProviderContext {
  name: string
}

const Context = createContext<CoreUiThemeProviderContext>({} as CoreUiThemeProviderContext)

export function CoreUiThemeProvider({ children }: CoreUiThemeProviderOptions) {
  const value: CoreUiThemeProviderContext = {
    name: 'default',
  }

  return (
    <Context.Provider value={value}>
      <ColorSchemeScript defaultColorScheme="dark" />
      <MantineProvider theme={defaultTheme} defaultColorScheme="dark">
        <ModalsProvider>
          <Notifications position="top-center" />
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </ModalsProvider>
      </MantineProvider>
    </Context.Provider>
  )
}

export function useUiTheme() {
  return useContext(Context)
}
