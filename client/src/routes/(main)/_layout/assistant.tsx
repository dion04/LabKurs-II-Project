import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/_layout/assistant')({
  component: AssistantComponent
})

function AssistantComponent() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold'>Chat Assistant</h1>
      <p className='text-muted-foreground'>Interact with the AI assistant.</p>
      {/* Placeholder content */}
    </div>
  )
}