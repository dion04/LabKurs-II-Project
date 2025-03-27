import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useState, useEffect } from 'react'

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  return (
    <div className='flex flex-col min-h-screen relative'>
      <Outlet />

      {process.env.NODE_ENV !== 'production' && <TanStackRouterDevtools />}
    </div>
  )
}
