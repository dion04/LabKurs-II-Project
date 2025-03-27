import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import ThemeSelector from '../components/ThemeSelector'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  // Initialize theme-change
  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <div className='min-h-screen'>
      <div className='absolute top-4 right-4 z-10'>
        <ThemeSelector />
      </div>

      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>The People's Voice</h1>
            <p className='py-6'>
              A crowd-sourced news platform where your voice matters. Join us in
              shaping the future of news.
            </p>
            <button className='btn btn-primary'>Get Started</button>
          </div>
        </div>
      </div>

      <div className='py-12 bg-base-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h2 className='text-3xl font-extrabold text-base-content'>
              Features
            </h2>
            <p className='mt-4 max-w-2xl text-xl text-base-content/70 mx-auto'>
              Everything you need to stay informed and connected.
            </p>
          </div>

          <div className='mt-10'>
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              <div className='card bg-base-200 shadow-xl'>
                <div className='card-body'>
                  <h2 className='card-title'>Community-Driven</h2>
                  <p>
                    News stories and coverage driven by the community, for the
                    community.
                  </p>
                </div>
              </div>

              <div className='card bg-base-200 shadow-xl'>
                <div className='card-body'>
                  <h2 className='card-title'>Real-Time Updates</h2>
                  <p>
                    Get the latest news as it happens from around the world.
                  </p>
                </div>
              </div>

              <div className='card bg-base-200 shadow-xl'>
                <div className='card-body'>
                  <h2 className='card-title'>Fact-Checking</h2>
                  <p>Community verification ensures accuracy in reporting.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className='footer sm:footer-horizontal bg-base-200 text-base-content p-10'>
        <aside>
          <svg
            width='50'
            height='50'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            fillRule='evenodd'
            clipRule='evenodd'
            className='fill-current'
          >
            <path d='M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z'></path>
          </svg>
          <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        <nav>
          <h6 className='footer-title'>Services</h6>
          <a className='link link-hover'>Branding</a>
          <a className='link link-hover'>Design</a>
          <a className='link link-hover'>Marketing</a>
          <a className='link link-hover'>Advertisement</a>
        </nav>
        <nav>
          <h6 className='footer-title'>Company</h6>
          <a className='link link-hover'>About us</a>
          <a className='link link-hover'>Contact</a>
          <a className='link link-hover'>Jobs</a>
          <a className='link link-hover'>Press kit</a>
        </nav>
        <nav>
          <h6 className='footer-title'>Legal</h6>
          <a className='link link-hover'>Terms of use</a>
          <a className='link link-hover'>Privacy policy</a>
          <a className='link link-hover'>Cookie policy</a>
        </nav>
      </footer>
    </div>
  )
}
