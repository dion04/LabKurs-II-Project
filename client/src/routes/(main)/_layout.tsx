import { createFileRoute } from '@tanstack/react-router'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/_layout')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar variant='inset' />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
