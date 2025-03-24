import { Link } from '@tanstack/react-router'
import { useAuth } from '../../auth/AuthContext'
import ThemeToggle from '../ui/ThemeToggle'
import AppLogo from '../../assets/AppLogo.png'

function Navbar({ theme, toggleTheme, scrolled }) {
  const { isAuthenticated, logout, user } = useAuth()

  // Generate the profile image source
  const getProfileImage = () => {
    if (user?.profileImageUrl) {
      return user.profileImageUrl
    }
    return `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=random`
  }

  return (
    <div className='fixed top-0 left-0 right-0 z-50 px-4 py-3'>
      <div
        className={`navbar rounded-xl transition-all duration-300 backdrop-blur-md ${
          scrolled ? 'bg-base-100/90 shadow-lg' : 'bg-base-100/80 shadow-md'
        }`}
      >
        <div className='navbar-start'>
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52'
            >
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/about'>About</Link>
              </li>
              {isAuthenticated && (
                <li>
                  <Link to='/dashboard'>Dashboard</Link>
                </li>
              )}
            </ul>
          </div>
          <Link to='/' className='flex items-center px-3 py-1 ml-2 text-xl'>
            <img src={AppLogo} alt='App Logo' className='w-32' />
          </Link>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1 gap-1.5'>
            <li>
              <Link to='/' className='[&.active]:font-bold'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/about' className='[&.active]:font-bold'>
                About
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to='/dashboard' className='[&.active]:font-bold'>
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className='navbar-end'>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          {isAuthenticated ? (
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle avatar'
              >
                <div className='w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mr-2'>
                  <img alt='User avatar' src={getProfileImage()} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className='mt-3 z-[1] p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-52'
              >
                <li>
                  <Link to='/dashboard'>Dashboard</Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <div className='flex'>
              <Link to='/login' className='btn btn-ghost btn-sm mr-2'>
                Login
              </Link>
              <Link to='/register' className='btn btn-primary btn-sm'>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
