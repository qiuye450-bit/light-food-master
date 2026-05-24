import { Outlet } from 'react-router-dom'
import TabBar from './TabBar'

export default function Layout() {
  return (
    <div className="min-h-dvh pb-20 overflow-x-hidden">
      <div className="max-w-md mx-auto">
        <Outlet />
      </div>
      <TabBar />
    </div>
  )
}
