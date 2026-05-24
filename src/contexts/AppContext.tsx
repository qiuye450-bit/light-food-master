import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getDarkMode, setDarkMode } from '../utils/storage'
import type { User } from '../types'

interface AppState {
  user: User
  updateUser: (user: User | ((prev: User) => User)) => void
  darkMode: boolean
  toggleDarkMode: () => void
}

const defaultUser: User = {
  id: 'user_001',
  nickname: '轻食爱好者',
  avatar: '',
  targetCalories: 1200,
  preferences: [],
  anthropicKey: '',
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, updateUser] = useLocalStorage<User>('lfm_user', defaultUser)
  const [darkMode, setDarkModeState] = useLocalStorage<boolean>('lfm_dark_mode', getDarkMode())

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkModeState(prev => {
      const next = !prev
      setDarkMode(next)
      return next
    })
  }

  return (
    <AppContext.Provider value={{ user, updateUser, darkMode, toggleDarkMode }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
