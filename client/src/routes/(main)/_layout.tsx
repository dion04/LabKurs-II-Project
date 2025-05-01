import { createFileRoute, Navigate } from '@tanstack/react-router'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from '@tanstack/react-router'
import { SiteHeader } from '@/components/dashboard/site-header'
import { SignedIn, SignedOut } from '@clerk/clerk-react'

export const Route = createFileRoute('/(main)/_layout')({
  component: RouteComponent
})

function RouteComponent() {
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
