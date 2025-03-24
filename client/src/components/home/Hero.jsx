import { Link } from '@tanstack/react-router'

function Hero() {
  return (
    <div className='hero min-h-[60vh] bg-base-200 rounded-lg mb-8'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-5xl font-bold'>The People's Voice</h1>
          <p className='py-6'>
            News powered by the people, for the people. Join our community of
            citizen journalists and readers who believe in transparent,
            community-driven reporting.
          </p>
          <Link to='/register' className='btn btn-primary'>
            Join Today
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
