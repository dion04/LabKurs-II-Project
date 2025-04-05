import { createFileRoute } from '@tanstack/react-router'
import {
  NewspaperIcon,
  GlobeAltIcon,
  MicrophoneIcon
} from '@heroicons/react/24/outline'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1503424886307-b090341d25d1',
      alt: 'News article on a tablet'
    },
    {
      src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
      alt: 'Breaking news on television'
    },
    {
      src: 'https://images.unsplash.com/photo-1593642634367-d91a135587b5',
      alt: 'Online news website on a laptop'
    },
    {
      src: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg',
      alt: 'Stack of newspapers'
    },
    {
      src: 'https://images.pexels.com/photos/261949/pexels-photo-261949.jpeg',
      alt: 'Microphone at a press conference'
    }
  ]

  return (
    <div className='px-4 py-8 flex flex-col items-center  gap-12'>
      <section className='text-center max-w-2xl'>
        <h1 className='text-5xl font-extrabold mb-4'>
          Welcome to <span className='text-primary'>The People's Voice</span>
        </h1>
        <p className='text-lg text-base-content/80 mb-6'>
          Independent. Transparent. Global. Your go-to platform for real news.
        </p>
        <div className='flex justify-center gap-4'>
          <button className='btn btn-primary'>Subscribe Now</button>
          <button className='btn btn-outline'>Browse Stories</button>
        </div>
      </section>

      <section className='w-full max-w-5xl'>
        <div className='carousel rounded-box flex space-x-4 overflow-x-auto px-2 py-6'>
          {images.map((image, index) => (
            <div
              key={index}
              className='carousel-item flex-shrink-0 w-[300px] h-[200px] shadow-lg'
            >
              <img
                src={image.src}
                alt={image.alt}
                className='rounded-lg w-full h-full object-cover'
              />
            </div>
          ))}
        </div>
      </section>

      <section className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-8 max-w-6xl w-full'>
        <div className='p-6 bg-base-100 shadow-lg rounded-xl'>
          <NewspaperIcon className='h-10 w-10 mx-auto text-primary mb-2' />
          <h3 className='font-bold text-xl mb-1'>Trusted News</h3>
          <p className='text-sm text-base-content/70'>
            We source stories from verified independent journalists across the
            globe.
          </p>
        </div>
        <div className='p-6 bg-base-100 shadow-lg rounded-xl'>
          <GlobeAltIcon className='h-10 w-10 mx-auto text-primary mb-2' />
          <h3 className='font-bold text-xl mb-1'>Global Coverage</h3>
          <p className='text-sm text-base-content/70'>
            From local insights to international reports — all in one place.
          </p>
        </div>
        <div className='p-6 bg-base-100 shadow-lg rounded-xl'>
          <MicrophoneIcon className='h-10 w-10 mx-auto text-primary mb-2' />
          <h3 className='font-bold text-xl mb-1'>Unfiltered Voices</h3>
          <p className='text-sm text-base-content/70'>
            We give a platform to unheard voices and communities often
            overlooked.
          </p>
        </div>
      </section>

      <footer className='mt-16 text-center text-sm text-base-content/60'>
        &copy; {new Date().getFullYear()} The People's Voice. All rights
        reserved.
      </footer>
    </div>
  )
}
