import { useUser } from '@clerk/clerk-react'
import ClerkHeader from '../../integrations/clerk/header-user'

export function NavUser() {
  const { user } = useUser()
  return (
    <div className='mt-auto p-2 flex gap-2'>
      <ClerkHeader />
      <div className='text-sm font-semibold tracking-tight text-black'>
        {user && (
          <>
            <div>
              {user.firstName} {user.lastName}
            </div>
            <div>{user.emailAddresses[0].emailAddress}</div>
          </>
        )}
      </div>
    </div>
  )
}
