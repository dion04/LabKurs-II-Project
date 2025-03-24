import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useState, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  const [theme, setTheme] = useState('light')
  const [scrolled, setScrolled] = useState(false)

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Load saved theme on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  return (
    <div className='flex flex-col min-h-screen relative'>
      <Navbar theme={theme} toggleTheme={toggleTheme} scrolled={scrolled} />

      {/* Main content - Add padding top to account for fixed navbar */}
      <main className='container mx-auto py-6 px-4 flex-grow mt-20'>
        <Outlet />
      </main>

      <Footer />

      {/* DevTools in development only */}
      {process.env.NODE_ENV !== 'production' && <TanStackRouterDevtools />}
    </div>
  )
}
