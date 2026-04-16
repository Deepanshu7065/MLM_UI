"use client"
import { createFileRoute } from '@tanstack/react-router'
import TicketForm from '@/components/contact/TicketForm'

export const Route = createFileRoute('/_protected/mycontact')({
  component: TicketForm,
})


