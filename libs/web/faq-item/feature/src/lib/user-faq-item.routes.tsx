import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const List = lazy(() => import('./user-faq-item-list.feature'))

export default function UserFaqItemRoutes() {
  return useRoutes([{ path: '', element: <List /> }])
}
