
import { createFileRoute } from "@tanstack/react-router";
import { UserDashboard } from "@/components/UserDashboar";


export const Route = createFileRoute('/_protected/dashboard')({
  component: UserDashboard,
})





