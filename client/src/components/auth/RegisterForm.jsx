import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useAuth } from '../../auth/AuthContext'

function RegisterForm() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateStepOne = () => {
    if (!formData.firstName || !formData.lastName) {
      setError('Please fill in all required fields')
      return false
    }
    setError('')
    return true
  }

  const nextStep = () => {
    if (validateStepOne()) {
      setStep(2)
    }
  }

  const prevStep = () => {
    setStep(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      return
    }

    setLoading(true)

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...userData } = formData

      const result = await register(userData)

      if (result.success) {
        navigate({ to: '/dashboard' })
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='card w-full max-w-md bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title text-2xl font-bold text-center mb-6'>
          Create your account
        </h2>

        {error && (
          <div className='alert alert-error mb-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='stroke-current shrink-0 h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <ul className='steps steps-horizontal w-full mb-6'>
          <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>
            Personal Info
          </li>
          <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>
            Account Details
          </li>
        </ul>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>First Name</span>
                </label>
                <input
                  id='firstName'
                  name='firstName'
                  type='text'
                  className='input input-bordered'
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='form-control mt-4'>
                <label className='label'>
                  <span className='label-text'>Last Name</span>
                </label>
                <input
                  id='lastName'
                  name='lastName'
                  type='text'
                  className='input input-bordered'
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='form-control mt-6'>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={nextStep}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  className='input input-bordered'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='form-control mt-4'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  className='input input-bordered'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label className='label'>
                  <span className='label-text-alt'>
                    Password must be at least 8 characters with one number
                  </span>
                </label>
              </div>

              <div className='form-control mt-4'>
                <label className='label'>
                  <span className='label-text'>Confirm Password</span>
                </label>
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  className='input input-bordered'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='flex mt-6 gap-4'>
                <button
                  type='button'
                  className='btn btn-outline flex-1'
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  type='submit'
                  className={`btn btn-primary flex-1 ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </div>
          )}
        </form>

        <div className='divider'>OR</div>

        <div className='flex flex-col space-y-3'>
          <button className='btn btn-outline gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='h-5 w-5'
            >
              <path
                fill='#4285F4'
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
              />
              <path
                fill='#34A853'
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
              />
              <path
                fill='#FBBC05'
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
              />
              <path
                fill='#EA4335'
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
              />
            </svg>
            Continue with Google
          </button>
          <button className='btn btn-outline gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='h-5 w-5 fill-current'
            >
              <path d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' />
            </svg>
            Continue with Facebook
          </button>
        </div>

        <div className='mt-6 text-center'>
          <p>
            Already have an account?{' '}
            <Link to='/login' className='link link-primary'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
