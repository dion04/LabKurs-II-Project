import { createFileRoute } from '@tanstack/react-router'
import RegisterForm from '../components/auth/RegisterForm'

export const Route = createFileRoute('/register')({
  component: Register
})

function Register() {
  return (
    <div className='min-h-screen flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8'>
      <RegisterForm />
    </div>
  )
}
