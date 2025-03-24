import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About
})

function About() {
  return (
    <div className='mockup-browser border-base-300 border w-full'>
      <div className='mockup-browser-toolbar'>
        <div className='input'>https://daisyui.com</div>
      </div>
      <div className='grid place-content-center border-t border-base-300 h-80'>
        Hello!
      </div>
    </div>
  )
}
