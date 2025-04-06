import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'

export const Route = createFileRoute('/register')({
  component: RouteComponent
})

function RouteComponent() {
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated) {
    navigate({ to: '/' })
    return null
  }

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('role', role)
    if (profileImage) {
      formData.append('profileImage', profileImage)
    }
    try {
      await register(formData).then((res) => {
        if (res.success) navigate({ to: '/' })
      })
    } catch (error) {
      console.error('Registration error:', error)
    }
    // Simulate registration delay

    // Registration logic would go here
  }

  return (
    <div className='min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8'>
      <div className='card lg:card-side bg-base-100 shadow-xl max-w-4xl w-full'>
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
                  id='smallGrid'
                  width='20'
                  height='20'
                  patternUnits='userSpaceOnUse'
                >
                  <path
                    d='M 20 0 L 0 0 0 20'
                    fill='none'
                    stroke='white'
                    strokeWidth='1'
                  />
                </pattern>
                <pattern
                  id='grid'
                  width='100'
                  height='100'
                  patternUnits='userSpaceOnUse'
                >
                  <rect width='100' height='100' fill='url(#smallGrid)' />
                  <path
                    d='M 100 0 L 0 0 0 100'
                    fill='none'
                    stroke='white'
                    strokeWidth='2'
                  />
                </pattern>
              </defs>
              <rect width='100%' height='100%' fill='url(#grid)' />
              <circle
                cx='400'
                cy='400'
                r='200'
                fill='none'
                stroke='white'
                strokeWidth='2'
                opacity='0.5'
              />
              <circle
                cx='400'
                cy='400'
                r='300'
                fill='none'
                stroke='white'
                strokeWidth='2'
                opacity='0.3'
              />
            </svg>
          </div>

          <div className='p-8 text-center text-white relative z-10'>
            <h2 className='text-4xl font-bold mb-4'>Join Our Community</h2>
            <p className='mb-8 opacity-90 text-lg max-w-md mx-auto'>
              Create an account today and get access to all our amazing
              features.
            </p>

            {/* Vector illustration */}
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
                <circle
                  cx='250'
                  cy='250'
                  r='100'
                  fill='white'
                  fillOpacity='0.2'
                />
                <circle cx='250' cy='180' r='50' fill='white' />
                <path
                  d='M250 250C194.772 250 150 294.772 150 350C150 405.228 194.772 450 250 450C305.228 450 350 405.228 350 350C350 294.772 305.228 250 250 250Z'
                  fill='white'
                />
                <path
                  d='M170 350C170 305.817 205.817 270 250 270C294.183 270 330 305.817 330 350'
                  stroke='rgba(99, 102, 241, 1)'
                  strokeWidth='8'
                />
                <circle cx='200' cy='180' r='10' fill='rgba(99, 102, 241, 1)' />
                <circle cx='300' cy='180' r='10' fill='rgba(99, 102, 241, 1)' />
                <path
                  d='M220 210C220 210 235 225 250 225C265 225 280 210 280 210'
                  stroke='rgba(99, 102, 241, 1)'
                  strokeWidth='8'
                  strokeLinecap='round'
                />
              </svg>
            </div>

            <div className='stats shadow bg-white/20 backdrop-blur-md border border-white/30 text-white w-full max-w-sm mx-auto rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'>
              <div className='stat'>
                <div className='stat-figure text-white'></div>
                <div className='stat-title text-white/90 font-medium'>Join</div>
                <div className='stat-value text-2xl md:text-3xl'>3.2K+</div>
                <div className='stat-desc text-white/80'>
                  Users already registered
                </div>
              </div>

              <div className='stat'>
                <div className='stat-figure text-white'></div>
                <div className='stat-title text-white/90 font-medium'>
                  Features
                </div>
                <div className='stat-value text-2xl md:text-3xl'>40+</div>
                <div className='stat-desc text-white/80'>
                  Premium tools available
                </div>
              </div>
            </div>
          </div>
        </figure>

        <div className='card-body lg:w-1/2'>
          <div className='text-center mb-6'>
            <h1 className='text-3xl font-bold'>Create your account</h1>
            <p className='text-sm opacity-70 mt-2'>
              Already have an account?{' '}
              <Link to='/login' className='link link-hover link-primary'>
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-medium'>First Name</span>
                </label>
                <input
                  type='text'
                  placeholder='John'
                  className='input input-bordered w-full'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-medium'>Last Name</span>
                </label>
                <input
                  type='text'
                  placeholder='Doe'
                  className='input input-bordered w-full'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className='form-control mt-4'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <input
                type='email'
                placeholder='name@example.com'
                className='input input-bordered w-full'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='form-control mt-4'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <input
                type='password'
                placeholder='••••••••'
                className='input input-bordered w-full'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className='label'>
                <span className='label-text-alt'>
                  Must be at least 8 characters with a number and special
                  character
                </span>
              </label>
            </div>

            <div className='form-control mt-4'>
              <label className='label'>
                <span className='label-text font-medium'>Role</span>
              </label>
              <select
                className='select select-bordered w-full'
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value='' disabled>
                  Select your role
                </option>
                <option value='user'>User</option>
                <option value='admin'>Administrator</option>
              </select>
            </div>

            <div className='form-control mt-4'>
              <label className='label'>
                <span className='label-text font-medium'>
                  Profile Picture (Optional)
                </span>
              </label>
              <div className='flex flex-col items-center'>
                {previewUrl && (
                  <div className='avatar mb-4'>
                    <div className='w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                      <img src={previewUrl} alt='Profile preview' />
                    </div>
                  </div>
                )}
                <input
                  type='file'
                  className='file-input file-input-bordered w-full'
                  accept='image/*'
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className='form-control mt-6'>
              <button
                type='submit'
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          <div className='divider my-6'>or sign up with</div>

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
