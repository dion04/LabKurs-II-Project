import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/_layout/archive')({
  component: ArchiveComponent
})

function ArchiveComponent() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold'>Archive</h1>
      <p className='text-muted-foreground'>View archived content.</p>
      {/* Placeholder content */}
    </div>
  )
}