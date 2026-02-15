import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { routeTree } from './routeTree.gen'
import { createRouter, RouterProvider } from '@tanstack/react-router'
// 1. Импортируем QueryClient и Provider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createRouter({ routeTree })
const queryClient = new QueryClient()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  )
}