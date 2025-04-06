import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'

export const Route = createFileRoute('/login')({
  component: RouteComponent
})

function RouteComponent() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    navigate({ to: '/' })
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    login(email, password)
      .then((res) => {
        if (res.success) {
          // Redirect to home or dashboard
          navigate({ to: '/' })
        } else {
          // Handle login error
          alert(res.error)
        }
      })
      .catch((error) => {
        console.error('Login error:', error)
        alert('Login failed. Please try again.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className=' flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='card lg:card-side bg-base-100 shadow-2xl max-w-4xl w-full'>
        <figure className='lg:w-1/2 bg-gradient-to-br from-primary to-secondary hidden lg:flex items-center justify-center relative overflow-hidden'>
          {/* Abstract background patterns */}
          <div className='absolute inset-0 opacity-10'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100%'
              height='100%'
              viewBox='0 0 800 800'
            >
              <defs>
                <pattern
                  id='loginGrid'
                  width='40'
                  height='40'
                  patternUnits='userSpaceOnUse'
                >
                  <path
                    d='M 40 0 L 0 0 0 40'
                    fill='none'
                    stroke='white'
                    strokeWidth='1'
                  />
                </pattern>
              </defs>
              <rect width='100%' height='100%' fill='url(#loginGrid)' />
              <circle
                cx='400'
                cy='400'
                r='250'
                fill='none'
                stroke='white'
                strokeWidth='2'
                opacity='0.3'
              />
              <circle
                cx='400'
                cy='400'
                r='150'
                fill='none'
                stroke='white'
                strokeWidth='2'
                opacity='0.5'
              />
            </svg>
          </div>

          <div className='p-8 text-center text-white relative z-10'>
            <h2 className='text-4xl font-bold mb-4'>Welcome Back!</h2>
            <p className='mb-8 opacity-90 text-lg max-w-md mx-auto'>
              We're excited to see you again. Log in to access your account and
              continue your journey.
            </p>

            {/* Key/Lock vector illustration */}
            <div className='mx-auto w-64 h-64 mb-8'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 500 500'
                fill='none'
              >
                <circle
                  cx='250'
                  cy='250'
                  r='150'
                  fill='white'
                  fillOpacity='0.1'
                />
                {/* Lock body */}
                <rect
                  x='150'
                  y='200'
                  width='200'
                  height='180'
                  rx='20'
                  fill='white'
                />
                {/* Lock shackle */}
                <path
                  d='M190 200V150C190 115 220 85 250 85C280 85 310 115 310 150V200'
                  stroke='white'
                  strokeWidth='25'
                  strokeLinecap='round'
                />
                {/* Keyhole */}
                <circle cx='250' cy='260' r='30' fill='rgba(99, 102, 241, 1)' />
                <rect
                  x='245'
                  y='260'
                  width='10'
                  height='50'
                  rx='5'
                  fill='rgba(99, 102, 241, 1)'
                />
                {/* Shine effect */}
                <path
                  d='M180 190A100 100 0 0 1 320 190'
                  stroke='rgba(255, 255, 255, 0.5)'
                  strokeWidth='8'
                  strokeLinecap='round'
                />
              </svg>
            </div>

            <div className='stats shadow bg-white/20 backdrop-blur-md border border-white/30 text-white w-full max-w-sm mx-auto rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'>
              <div className='stat'>
                <div className='stat-figure text-white'></div>
                <div className='stat-title text-white/90 font-medium'>
                  Welcome Back!
                </div>
                <div className='stat-value text-2xl md:text-3xl'>1,234</div>
                <div className='stat-desc text-white/80'>
                  Active members online
                </div>
              </div>
            </div>
          </div>
        </figure>

        <div className='card-body lg:w-1/2'>
          <div className='text-center mb-6'>
            <h1 className='text-3xl font-bold'>Sign in to your account</h1>
            <p className='text-sm opacity-70 mt-2'>
              Or{' '}
              <Link to='/register' className='link link-hover link-primary'>
                create a new account
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='input-group'>
                <input
                  type='email'
                  placeholder='name@example.com'
                  className='input input-bordered w-full'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className='form-control mt-4'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
                <Link
                  to='/forgot-password'
                  className='label-text-alt link link-hover'
                >
                  Forgot password?
                </Link>
              </label>
              <div className='input-group'>
                <input
                  type='password'
                  placeholder='••••••••'
                  className='input input-bordered w-full'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className='flex items-center mt-4'>
              <label className='label cursor-pointer justify-start gap-2'>
                <input
                  type='checkbox'
                  className='checkbox checkbox-primary checkbox-sm'
                />
                <span className='label-text'>Remember me</span>
              </label>
            </div>

            <div className='form-control mt-6'>
              <button
                type='submit'
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className='divider my-6'>or continue with</div>

          <div className='grid grid-cols-3 gap-3'>
            <button className='btn btn-outline'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 24 24'
              >
                <path d='M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z' />
              </svg>
              Google
            </button>
            <button className='btn btn-outline'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 24 24'
              >
                <path d='M22,12c0-5.523-4.477-10-10-10S2,6.477,2,12c0,4.991,3.657,9.128,8.438,9.878V14.89h-2.54V12h2.54V9.797c0-2.506,1.492-3.89,3.777-3.89c1.094,0,2.238,0.195,2.238,0.195v2.46h-1.26c-1.243,0-1.63,0.771-1.63,1.562V12h2.773l-0.443,2.89h-2.33v6.988C18.343,21.128,22,16.991,22,12z' />
              </svg>
              Facebook
            </button>
            <button className='btn btn-outline'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 24 24'
              >
                <path d='M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm6.24,15.14A8,8,0,0,1,5.36,6.86L16.14,17.64A7.93,7.93,0,0,1,12,19,8,8,0,0,1,12,4a7.93,7.93,0,0,1,4,1.07L5.17,15.93A8,8,0,0,1,18.24,17.14Z' />
              </svg>
              Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
