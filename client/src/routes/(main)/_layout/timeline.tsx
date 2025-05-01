import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/_layout/timeline')({
  component: TimelineComponent
})

function TimelineComponent() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold'>Timeline</h1>
      <p className='text-muted-foreground'>
        View the latest updates and activities.
      </p>
      {/* Placeholder content */}
    </div>
  )
}
