import { useEffect } from 'react'
import { useAuth } from '../auth/AuthContext'
import { themeChange } from 'theme-change'
import ThemeSelector from '../components/ThemeSelector'
import { useNavigate } from '@tanstack/react-router'

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  console.log(user)

  const handleLogout = () => {
    logout()
    navigate({ to: '/landing' })
  }

  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <div className='fixed top-4 left-1/2 z-50 w-[95%]  -translate-x-1/2 rounded-2xl bg-base-100/90 backdrop-blur shadow-lg px-6 py-3 flex items-center justify-between'>
      <a className='btn btn-ghost text-xl whitespace-nowrap'>
        The People's Voice
      </a>

      <div className='flex items-center gap-3 flex-1 justify-end'>
        <input
          type='text'
          placeholder='Search'
          className='input input-bordered w-full max-w-md'
        />

        {user && (
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div className='w-10 rounded-full'>
                <img
                  alt='User Avatar'
                  src={
                    user?.profileImageUrl ||
                    'https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg'
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow'
            >
              <li>
                <a className='justify-between'>
                  Profile
                  <span className='badge'>New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}

        {!isAuthenticated && (
          <div className='flex gap-2'>
            <a href='/login' className='btn btn-primary'>
              Login
            </a>
            <a href='/register' className='btn btn-secondary'>
              Register
            </a>
          </div>
        )}

        <ThemeSelector />
      </div>
    </div>
  )
}

export default Navbar
