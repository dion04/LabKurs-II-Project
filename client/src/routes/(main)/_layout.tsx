import { createFileRoute, Navigate } from '@tanstack/react-router'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from '@tanstack/react-router'
import { SiteHeader } from '@/components/dashboard/site-header'
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-react'
import { setTokenGetter } from '@/../api/apiClient'
import { useEffect } from 'react'
export const Route = createFileRoute('/(main)/_layout')({
  component: RouteComponent
})

function RouteComponent() {
  const { getToken } = useAuth()

  useEffect(() => {
    // Set the token getter function that will be used by the API client
    if (getToken) {
      console.log('Setting token getter in layout')
      // Wrap in an async function that properly handles the promise
      setTokenGetter(async () => {
        try {
          console.log('Token getter function called')
          const token = await getToken({ template: 'default' })
          console.log(
            'Clerk getToken result:',
            token ? 'Token received' : 'No token'
          )
          return token
        } catch (error) {
          console.error('Error getting token from Clerk:', error)
          return null
        }
      })
    }
  }, [getToken])

  // Add a cleanup function
  useEffect(() => {
    return () => {
      // This ensures we don't have lingering token getters when components unmount
      console.log('Layout component unmounting, cleaning up...')
    }
  }, [])

  return (
    <>
      <SignedIn>
        <SidebarProvider>
          <AppSidebar variant='inset' />
          <SidebarInset>
            <SiteHeader />
            <div className='p-4'>
              <Outlet />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </SignedIn>

      <SignedOut>
        <Navigate to='/landing' />
      </SignedOut>
    </>
  )
}
