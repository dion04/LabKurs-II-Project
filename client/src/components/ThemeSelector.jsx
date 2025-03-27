import { useEffect, useState } from 'react'

function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState('corporate')

  useEffect(() => {
    // Get the current theme from localStorage or default
    const theme = localStorage.getItem('theme') || 'corporate'
    setCurrentTheme(theme)
  }, [])

  return (
    <div className='dropdown dropdown-end'>
      <label tabIndex={0} className='btn m-1 btn-ghost'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42'
          />
        </svg>
        Theme
      </label>
      <ul
        tabIndex={0}
        className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'
      >
        <li>
          <button
            data-set-theme='light'
            data-act-class='active'
            className={currentTheme === 'light' ? 'active' : ''}
          >
            Light
          </button>
        </li>
        <li>
          <button
            data-set-theme='dark'
            data-act-class='active'
            className={currentTheme === 'dark' ? 'active' : ''}
          >
            Dark
          </button>
        </li>
        <li>
          <button
            data-set-theme='corporate'
            data-act-class='active'
            className={currentTheme === 'corporate' ? 'active' : ''}
          >
            Corporate
          </button>
        </li>
        <li>
          <button
            data-set-theme='business'
            data-act-class='active'
            className={currentTheme === 'business' ? 'active' : ''}
          >
            Business
          </button>
        </li>
        <li>
          <button
            data-set-theme='forest'
            data-act-class='active'
            className={currentTheme === 'forest' ? 'active' : ''}
          >
            Forest
          </button>
        </li>
        <li>
          <button
            data-set-theme='luxury'
            data-act-class='active'
            className={currentTheme === 'luxury' ? 'active' : ''}
          >
            Luxury
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ThemeSelector
