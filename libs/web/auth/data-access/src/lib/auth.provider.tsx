import { AppConfig, IdentityProvider, LoginInput, RegisterInput, sdk, User, UserRole } from '@deanslist-platform/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useContext, useEffect, useMemo, useReducer } from 'react'
import { useMe } from './use-me'

type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading' | 'error'

export interface AuthState {
  status: AuthStatus
  error?: unknown | undefined
  user?: User | undefined
}

export interface AuthProviderContext extends AuthState {
  appConfig?: AppConfig | undefined
  appConfigLoading: boolean
  authenticated: boolean
  authEnabled: boolean
  developer: boolean
  enabledProviders: IdentityProvider[]
  error?: unknown | undefined
  hasSolana: boolean
  isAdmin: boolean
  isManager: boolean
  isOnboarded: boolean
  solanaRpcUrl: string
  loading: boolean
  login: (input: LoginInput) => Promise<User | undefined>
  logout: () => Promise<boolean | undefined>
  refresh: () => Promise<boolean>
  register: (input: RegisterInput) => Promise<User | undefined>
}

const Context = createContext<AuthProviderContext>({} as AuthProviderContext)

export type AuthAction =
  | { type: 'login'; payload: User }
  | { type: 'logout'; payload?: unknown }
  | { type: 'error'; payload: unknown }
  | { type: 'loading'; payload?: unknown }

function authReducer(state: AuthState, { type, payload }: AuthAction): AuthState {
  switch (type) {
    case 'login':
      return {
        ...state,
        status: 'authenticated',
        user: payload,
      }
    case 'logout':
      return {
        ...state,
        status: 'unauthenticated',
        user: undefined,
      }
    case 'error':
      return {
        ...state,
        status: 'error',
        error: payload,
      }
    case 'loading':
      return {
        ...state,
        status: 'loading',
      }
    default:
      return state
  }
}

export function useAppConfig() {
  return useQuery({
    queryKey: ['app-config'],
    queryFn: () => sdk.appConfig().then((res) => res.data),
  })
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const me = useMe()
  const configQuery = useAppConfig()

  const [state, dispatch] = useReducer(authReducer, { status: 'loading' })

  function dispatchUser(user?: User | null) {
    dispatch(user ? { type: 'login', payload: user } : { type: 'logout' })
    return !!user
  }

  useEffect(() => {
    if (me.isLoading) return
    dispatchUser(me.data?.me)
  }, [me.isLoading, me.data?.me])

  const authEnabled = useMemo(() => {
    if (!configQuery.data?.config) return false
    const { authDiscordEnabled, authPasswordEnabled, authRegisterEnabled, authSolanaEnabled } = configQuery.data.config
    return authDiscordEnabled || authRegisterEnabled || authPasswordEnabled || authSolanaEnabled
  }, [configQuery.data?.config])

  const enabledProviders: IdentityProvider[] = useMemo(
    () =>
      configQuery.data?.config
        ? ([
            configQuery.data?.config.authDiscordEnabled && IdentityProvider.Discord,
            configQuery.data?.config.authSolanaEnabled && IdentityProvider.Solana,
          ].filter(Boolean) as IdentityProvider[])
        : [],
    [configQuery.data?.config],
  )

  const hasSolana = (state.user?.identities ?? []).some(
    (identity) => identity.verified === true && identity.provider === IdentityProvider.Solana,
  )
  const isAdmin = state.user?.role === UserRole.Admin
  const isManager = state.user?.manager || isAdmin

  const solanaRpcUrl = configQuery.data?.config?.solanaMainnetUrl ?? 'http://localhost:8899'
  const value: AuthProviderContext = {
    appConfig: configQuery.data?.config,
    appConfigLoading: configQuery.isLoading,
    authEnabled,
    authenticated: state.status === 'authenticated',
    developer: state.user?.developer ?? false,
    enabledProviders,
    error: state.error,
    hasSolana,
    isOnboarded: hasSolana,
    isAdmin,
    isManager,
    user: state.user,
    solanaRpcUrl,
    status: state.status,
    loading: state.status === 'loading',

    login: (input: LoginInput) =>
      sdk
        .login({ input })
        .then((res) => {
          if (res.data.login) {
            toastSuccess('Login successful')
            dispatch({ type: 'login', payload: res.data.login })
            return res.data.login
          }
          toastError('Login failed')
        })
        .catch((err) => {
          toastError(err.message)
          dispatch({ type: 'error', payload: err })
          return undefined
        }),
    logout: () =>
      sdk
        .logout()
        .then((res) => {
          if (res.data.logout) {
            toastSuccess({ title: 'Logout successful', message: 'We hope you enjoyed your stay!' })
            dispatch({ type: 'logout' })
            return res.data.logout
          }
          toastError('Logout failed')
        })
        .catch((err) => {
          toastError(err.message)
          dispatch({ type: 'error', payload: err })
          return undefined
        }),
    refresh: async () => me.refetch().then((res) => dispatchUser(res.data?.me)),
    register: (input: RegisterInput) =>
      sdk
        .register({ input })
        .then((res) => {
          if (res.data.register) {
            toastSuccess('Register successful')
            dispatch({ type: 'login', payload: res.data.register })
            return res.data.register
          }
          toastError('Register failed')
        })
        .catch((err) => {
          toastError(err.message)
          dispatch({ type: 'error', payload: err })
          return undefined
        }),
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useAuth() {
  return useContext(Context)
}
