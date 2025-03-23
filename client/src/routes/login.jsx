import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'

export const Route = createFileRoute('/login')({
  component: Login
})

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const result = await login(formData.email, formData.password)

    if (result.success) {
      navigate({ to: '/dashboard' })
    } else {
      setError(result.error)
    }
  }

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>

      {error && (
        <div className='mb-4 p-2 bg-red-100 text-red-700 rounded'>{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2' htmlFor='email'>
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            className='w-full px-3 py-2 border border-gray-300 rounded'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className='mb-6'>
          <label className='block text-gray-700 mb-2' htmlFor='password'>
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            className='w-full px-3 py-2 border border-gray-300 rounded'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
        >
          Login
        </button>
      </form>

      <p className='mt-4 text-center'>
        Don't have an account?{' '}
        <Link to='/register' className='text-blue-500'>
          Register
        </Link>
      </p>
    </div>
  )
}
