import { AppShell, AppShellNavbarConfiguration, AppShellProps, Loader, rem } from '@mantine/core'
import { ReactNode, Suspense } from 'react'
import { purpleGradient } from '../core-ui-constants'

export function CoreUiLayout({
  children,
  header,
  headerHeight = rem(72),
  navbar,
  navbarConfig = {},
  ...props
}: Omit<AppShellProps, 'header' | 'navbar'> & {
  children: ReactNode
  header: ReactNode
  headerHeight?: string
  navbar?: ReactNode
  navbarConfig?: Omit<AppShellNavbarConfiguration, 'width' | 'breakpoint'>
}) {
  return (
    <AppShell
      withBorder={false}
      layout="alt"
      styles={{
        root: { ...purpleGradient },
        header: { backgroundColor: 'transparent' },
        navbar: { backgroundColor: 'inherit' },
      }}
      header={{ height: headerHeight }}
      navbar={navbar ? { width: 300, breakpoint: 'md', ...navbarConfig } : undefined}
      padding="md"
      {...props}
    >
      <AppShell.Header>{header}</AppShell.Header>
      {navbar ? (
        <AppShell.Navbar className="gradient-navbar" p="md">
          {navbar}
        </AppShell.Navbar>
      ) : null}
      <AppShell.Main>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </AppShell.Main>
    </AppShell>
  )
}
