import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query'
import './style.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { routeTree } from './routeTree.gen'
import { AuthProvider } from './auth/AuthContext'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0
})
const queryClient = new QueryClient()
const rootElement = document.getElementById('root')
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}
