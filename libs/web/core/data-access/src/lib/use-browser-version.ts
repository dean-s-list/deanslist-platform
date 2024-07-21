import { useUserAgent } from '@oieduardorabelo/use-user-agent'

export function useBrowserVersion() {
  const result = useUserAgent()

  return {
    browser: result?.browser ? `${result?.browser?.name} ${result?.browser?.version}` : null,
    os: result?.os ? `${result?.os?.name} ${result?.os?.version}` : null,
  }
}
