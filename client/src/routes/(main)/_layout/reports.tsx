import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/_layout/reports')({
  component: ReportsComponent
})

function ReportsComponent() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold'>Published Reports</h1>
      <p className='text-muted-foreground'>Browse published news reports.</p>
      {/* Placeholder content */}
    </div>
  )
}
