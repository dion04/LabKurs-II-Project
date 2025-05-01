import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/_layout/community-chat')({
  component: CommunityChatComponent
})

function CommunityChatComponent() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold'>Community Chat</h1>
      <p className='text-muted-foreground'>Engage with the community.</p>
      {/* Placeholder content */}
    </div>
  )
}
