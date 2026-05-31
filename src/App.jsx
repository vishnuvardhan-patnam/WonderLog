import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { BucketListProvider } from './context/BucketListContext'
import PrivateRoute from './components/Layout/PrivateRoute'
import Navbar from './components/Layout/Navbar'

// Pages — lazy-load is optional here but keeps the file readable
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ExplorePage from './pages/ExplorePage'
import CountryDetailPage from './pages/CountryDetailPage'
import BucketListPage from './pages/BucketListPage'

export default function App() {
  return (
    // AuthProvider must wrap BucketListProvider because BucketList
    // needs to know which user's data to load from localStorage.
    <AuthProvider>
      <BucketListProvider>
        <BrowserRouter>
          {/* Navbar is always visible; it hides user links when not logged in */}
          <Navbar />

          <Routes>
            {/* Public routes */}
            <Route path="/login"  element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected routes — redirect to /login if not authenticated */}
            <Route
              path="/explore"
              element={
                <PrivateRoute>
                  <ExplorePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/country/:code"
              element={
                <PrivateRoute>
                  <CountryDetailPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/bucketlist"
              element={
                <PrivateRoute>
                  <BucketListPage />
                </PrivateRoute>
              }
            />

            {/* Fallback: send everyone to /explore (PrivateRoute handles auth) */}
            <Route path="*" element={<Navigate to="/explore" replace />} />
          </Routes>
        </BrowserRouter>
      </BucketListProvider>
    </AuthProvider>
  )
}
