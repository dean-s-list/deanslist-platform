import { AppShell, AppShellNavbarConfiguration, AppShellProps, Loader, rem } from '@mantine/core'
import { ReactNode, Suspense } from 'react'

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
      header={{ height: headerHeight }}
      navbar={navbar ? { width: 300, breakpoint: 'md', ...navbarConfig } : undefined}
      padding="md"
      {...props}
    >
      <AppShell.Header>{header}</AppShell.Header>
      {navbar ? <AppShell.Navbar p="md">{navbar}</AppShell.Navbar> : null}
      <AppShell.Main>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </AppShell.Main>
    </AppShell>
  )
}
