import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const location = useLocation()

  if (user === null) {
    // while checking session, you could return a spinner
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
