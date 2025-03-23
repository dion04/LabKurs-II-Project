import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useAuth } from '../auth/AuthContext'

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <>
      <div className='p-2 flex gap-2'>
        <Link to='/' className='[&.active]:font-bold'>
          Home
        </Link>
        <Link to='/about' className='[&.active]:font-bold'>
          About
        </Link>
        {isAuthenticated ? (
          <>
            <Link to='/dashboard' className='[&.active]:font-bold'>
              Dashboard
            </Link>
            <button onClick={logout} className='ml-auto'>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login' className='[&.active]:font-bold ml-auto'>
              Login
            </Link>
            <Link to='/register' className='[&.active]:font-bold'>
              Register
            </Link>
          </>
        )}
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
