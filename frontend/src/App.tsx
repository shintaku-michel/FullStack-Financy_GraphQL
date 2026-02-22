import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Categories } from './pages/Categories/index'
import { Dashboard } from './pages/Dashboard/index'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Transactions } from './pages/Transactions/index'
import { useAuthStore } from './stores/auth'


/* Proteção de rotas */
function ProtectedRouter({children}: {children: React.ReactNode}){
  const {isAuthenticated} = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function PublicRoute({children}: {children: React.ReactNode}) {
  const {isAuthenticated} = useAuthStore()
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />
}

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        <Route path="/" element={
          <ProtectedRouter>
            <Dashboard />
          </ProtectedRouter>
        } />
        <Route path="/categories" element={
          <ProtectedRouter>
            <Categories />
          </ProtectedRouter>
        } />
        <Route path="/transactions" element={
          <ProtectedRouter>
            <Transactions />
          </ProtectedRouter>
        } />
      </Routes>
    </Layout>
  )
}

export default App
