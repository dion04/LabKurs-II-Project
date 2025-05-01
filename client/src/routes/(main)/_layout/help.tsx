import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/_layout/help')({
  component: HelpComponent
})

function HelpComponent() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold'>Get Help</h1>
      <p className='text-muted-foreground'>Find support and documentation.</p>
      {/* Placeholder content */}
    </div>
  )
}