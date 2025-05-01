import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/_layout/search')({
  component: SearchComponent
})

function SearchComponent() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold'>Search</h1>
      <p className='text-muted-foreground'>Search across the platform.</p>
      {/* Placeholder content */}
    </div>
  )
}
