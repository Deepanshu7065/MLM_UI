import CartView from '@/components/Courses/CartView'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/cart')({
  component: CartView,
})
