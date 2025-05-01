import { useEffect } from 'react'
import { useAuth } from '../auth/AuthContext'
import { themeChange } from 'theme-change'
import ThemeSelector from '../components/ThemeSelector'
import { useNavigate } from '@tanstack/react-router'
const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth()

  useEffect(() => {
    themeChange(false)
  }, [])

  const navigate = useNavigate()
  const handleRedirectHome = () => {
    navigate ({to: '/' })

  }
  return (
    <div className='fixed top-4 left-1/2 z-50 w-[95%]  -translate-x-1/2 rounded-2xl bg-base-100/90 backdrop-blur shadow-lg px-6 py-3 flex items-center justify-between'>
      <a onClick={handleRedirectHome} className='btn btn-ghost text-xl whitespace-nowrap'>
        The People's Voice
      </a>

      <div className='flex items-center gap-3 flex-1 justify-end'>
        <input
          type='text'
          placeholder='Search'
          className='input input-bordered w-full max-w-md'
        />

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
                  user?.profileImageUrl || 'https://placeimg.com/80/80/people'
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
              <a onClick={logout}>Logout</a>
            </li>
          </ul>
        </div>

        <ThemeSelector />
      </div>
    </div>
  )
}

export default Navbar
