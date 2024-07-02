import { useQuery } from '@tanstack/react-query'

export interface UserIdentity {
  name: string
  avatarUrl?: string | null
  twitter?: string | null
}

export interface UserIdentityMap {
  [providerId: string]: UserIdentity
}

export function useAnonUserIdentityMap({ apiUrl = '' }: { apiUrl?: string } = {}) {
  return useQuery({
    queryKey: ['anon', 'get-user-map'],
    queryFn: () => fetch(`${apiUrl}/api/users/identity-map`).then((res) => res.json() as Promise<UserIdentityMap>),
    staleTime: 3600000, // 1 hour
  })
}
