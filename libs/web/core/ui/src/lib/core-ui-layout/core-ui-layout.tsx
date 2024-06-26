import { AppShell, AppShellNavbarConfiguration, AppShellProps, Loader, rem } from '@mantine/core'
import { ReactNode, Suspense } from 'react'

export function CoreUiLayout({
  children,
  header,
  headerHeight = rem(56),
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
      header={{ height: headerHeight }}
      navbar={{ width: 300, breakpoint: 'md', ...navbarConfig }}
      padding="md"
      {...props}
    >
      <AppShell.Header>{header}</AppShell.Header>
      <AppShell.Navbar p="md">{navbar}</AppShell.Navbar>
      <AppShell.Main>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </AppShell.Main>
    </AppShell>
  )
}
