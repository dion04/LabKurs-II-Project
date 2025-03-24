import { createFileRoute } from '@tanstack/react-router'
import LoginForm from '../components/auth/LoginForm'

export const Route = createFileRoute('/login')({
  component: Login
})

function Login() {
  return (
    <div className='min-h-screen flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8'>
      <LoginForm />
    </div>
  )
}
