import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const nav = useNavigate()

  const onLogout = async () => {
    await logout()
    nav('/login')
  }

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link to="/">BudgetWise</Link>
      <div>
        {user ? (
          <>
            <span className="mr-4">Hi, {user.email}</span>
            <button onClick={onLogout} className="px-3 py-1 bg-red-600 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login"    className="px-3 py-1 mr-2 bg-blue-600 rounded">Login</Link>
            <Link to="/register" className="px-3 py-1 bg-green-600 rounded">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
