import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './contexts/AppContext'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import HistoryPage from './pages/HistoryPage'
import SocialFeedPage from './pages/SocialFeedPage'
import FriendsPage from './pages/FriendsPage'
import ProfilePage from './pages/ProfilePage'

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/social" element={<SocialFeedPage />} />
            <Route path="/social/friends" element={<FriendsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}
