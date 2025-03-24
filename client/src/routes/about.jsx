import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About
})

function About() {
  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <div className='hero bg-base-200 py-12 rounded-lg'>
        <div className='hero-content text-center'>
          <div className='max-w-lg'>
            <h1 className='text-5xl font-bold'>About Us</h1>
            <p className='py-6'>
              At The People's Voice, we believe that journalism should be
              democratic, transparent, and community-driven. Our platform
              empowers everyday people to share stories that matter.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className='py-12'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row gap-8'>
            <div className='flex-1'>
              <div className='card bg-primary text-primary-content'>
                <div className='card-body'>
                  <h2 className='card-title text-2xl'>Our Mission</h2>
                  <p>
                    To democratize news and information by creating a platform
                    where everyday people can share stories that matter to their
                    communities.
                  </p>
                </div>
              </div>
            </div>
            <div className='flex-1'>
              <div className='card bg-secondary text-secondary-content'>
                <div className='card-body'>
                  <h2 className='card-title text-2xl'>Our Vision</h2>
                  <p>
                    A world where news is transparent, community-driven, and
                    accessible to everyone, regardless of geographic or
                    socioeconomic barriers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className='py-12'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold mb-4'>
            Ready to join our community?
          </h2>
          <p className='mb-6 max-w-2xl mx-auto'>
            Become a contributor today and help shape the future of news.
          </p>
          <Link to='/register' className='btn btn-primary btn-lg'>
            Join The People's Voice
          </Link>
        </div>
      </div>
    </div>
  )
}
