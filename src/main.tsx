import './index.css'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './theme/ThemeProvider'
import { SocketProvider } from './context/SocketProvider'
import { Toaster } from 'sonner'



const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

// Render the app
export const queryClient = new QueryClient();
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <ThemeProvider>
                <SocketProvider>
                    <QueryClientProvider client={queryClient}>
                        <RouterProvider router={router} />
                        <Toaster position="top-center" richColors />
                        {/* <GlobalModal /> */}
                    </QueryClientProvider>
                </SocketProvider>
            </ThemeProvider>
        </StrictMode>,
    )
}