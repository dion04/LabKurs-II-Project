import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/_layout/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <>
      <SignedIn>
        <div>Hello "/(main)/_layout/"!</div>
      </SignedIn>
      <SignedOut>
        <Navigate to='/landing' />
      </SignedOut>
    </>
  )
}
