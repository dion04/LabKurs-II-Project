import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/')({
  component: Index
})

function Index() {
  return <h1>main</h1>
}
