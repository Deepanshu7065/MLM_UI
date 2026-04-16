// src/routes/_root.tsx
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { GlobalModal } from '@/components/GlobalModal/GlobalModalComponent'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />       
      <GlobalModal /> 
    </>
  ),
})