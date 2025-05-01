import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/_layout/settings')({
  component: SettingsComponent
})

function SettingsComponent() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold'>Settings</h1>
      <p className='text-muted-foreground'>Manage your account settings.</p>
      {/* Placeholder content */}
    </div>
  )
}
