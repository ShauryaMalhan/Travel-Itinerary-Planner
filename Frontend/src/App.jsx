import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { useAuth } from './hooks/useAuth'
import Navbar from './services/Navbar'
import Dashboard from './common/Dashboard'
import Login from './common/Login'
import Register from './common/Register'
import TripDetails from './common/TripDetails'
import ActivitySelection from './common/ActivitySelection'
import ShareView from './common/ShareView'
import ItineraryPlanner from './common/ItineraryPlanner'

function AppContent() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <Router>
      <div className="app-layout">
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <Login />
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <Register />
            } 
          />
          
          {/* Protected routes */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/activity-selection" 
            element={
              isAuthenticated ? <ActivitySelection /> : <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/trip-details" 
            element={
              isAuthenticated ? <TripDetails /> : <Navigate to="/login" replace />
            } 
          />
          {/* Public share route */}
          <Route path="/s/:id" element={<ShareView />} />
          <Route 
            path="/planner" 
            element={
              isAuthenticated ? <ItineraryPlanner /> : <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/trip/:id" 
            element={
              isAuthenticated ? <TripDetails /> : <Navigate to="/login" replace />
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
