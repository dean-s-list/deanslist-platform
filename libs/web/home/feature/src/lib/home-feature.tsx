import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/home-page'

export default function HomeFeature() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}
