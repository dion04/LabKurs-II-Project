import { createFileRoute } from '@tanstack/react-router'
import Hero from '../components/home/Hero'
import CategoryBrowser from '../components/home/CategoryBrowser'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  return (
    <div className='min-h-screen'>
      <Hero />

      <div className='container mx-auto'>
        <h2 className='text-3xl font-bold mb-6'>Featured Stories</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* This will be populated from API data */}
          <div className='flex justify-center items-center h-64 bg-base-200 rounded-lg'>
            <p className='text-base-content/70'>No stories yet</p>
          </div>
        </div>

        <CategoryBrowser />

        {/* Call to Action */}
        <div className='mt-16 text-center'>
          <h2 className='text-2xl font-bold mb-4'>
            Ready to share your story?
          </h2>
          <p className='mb-6'>
            Join our community of writers and make your voice heard.
          </p>
        </div>
      </div>
    </div>
  )
}
