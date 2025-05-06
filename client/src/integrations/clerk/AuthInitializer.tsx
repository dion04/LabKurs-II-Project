import { useUser, useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { setTokenGetter } from '../../../api/apiClient'

export function AuthInitializer() {
  const { user, isSignedIn } = useUser()
  const { getToken } = useAuth()

  useEffect(() => {
    // Set the token getter function using the Clerk getToken method from useAuth
    setTokenGetter(async () => {
      if (isSignedIn && user) {
        return await getToken()
      }
      return null
    })
  }, [getToken, isSignedIn, user])

  // This component doesn't render anything
  return null
}
