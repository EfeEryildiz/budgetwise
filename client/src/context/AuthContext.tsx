import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'

interface AuthContextType {
  user: { id: number; email: string } | null
  refreshUser: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ id: number; email: string } | null>(null)

  // on mount, check session
  const refreshUser = async () => {
    try {
      const res = await axios.get('/api/auth/me', { withCredentials: true })
      setUser(res.data.user)
    } catch {
      setUser(null)
    }
  }

  const logout = async () => {
    await axios.post('/api/auth/logout', {}, { withCredentials: true })
    setUser(null)
  }

  useEffect(() => {
    refreshUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
