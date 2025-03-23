import { redirect } from '@tanstack/react-router'

export function protectRoute({ context }) {
  const token = localStorage.getItem('token')
  if (!token) {
    throw redirect({
      to: '/login',
      search: {
        redirectTo: context.location.href
      }
    })
  }
}
