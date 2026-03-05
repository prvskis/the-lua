import { Outlet } from 'react-router-dom'
import { Header } from '@/components/header/Header'

export function AppShell() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  )
}
