// client/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegisterPage    from './pages/RegisterPage'
import LoginPage       from './pages/LoginPage'
import Dashboard       from './pages/Dashboard'
import Navbar          from './components/Navbar'
import ProtectedRoute  from './components/ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Router>
      {/* Navbar shows on every page */}
      <Navbar />

      {/* your routes */}
      <Routes>
        <Route path="/login"    element={<LoginPage    />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* protect the dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Toasts can live here, outside of <Routes> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  )
}

export default App
