import { ReactNode } from 'react'
import { useParams } from 'react-router-dom'

type UiRouteParamMap = Record<string, string>

interface UiRouteParamsProps<T extends UiRouteParamMap> {
  element: (paramMap: T) => ReactNode
}

export function UiRouteParams<T extends UiRouteParamMap>({ element }: UiRouteParamsProps<T>) {
  const params = useParams<T>() as T

  return element(params)
}
