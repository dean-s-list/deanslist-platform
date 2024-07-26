import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Create = lazy(() => import('./admin-faq-item-create.feature'))
const Detail = lazy(() => import('./admin-faq-item-detail.feature'))
const List = lazy(() => import('./admin-faq-item-list.feature'))

export default function AdminFaqItemRoutes() {
  return useRoutes([
    { path: '', element: <List /> },
    { path: 'create', element: <Create /> },
    { path: ':faqItemId/*', element: <Detail /> },
  ])
}
