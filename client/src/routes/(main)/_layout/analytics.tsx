import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/_layout/analytics')({
  component: AnalyticsComponent
})

function AnalyticsComponent() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold'>Analytics</h1>
      <p className='text-muted-foreground'>
        View platform analytics and trends.
      </p>
      {/* Placeholder content */}
    </div>
  )
}
