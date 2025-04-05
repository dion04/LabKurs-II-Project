import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Navbar from '../components/Navbar'

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  return (
    <div className='flex flex-col min-h-screen relative'>
      <Navbar />
      <div className='w-[97%] mx-auto mt-24'>
        <Outlet />
      </div>

      {process.env.NODE_ENV !== 'production' && <TanStackRouterDevtools />}
    </div>
  )
}
