import MainCourses from '@/components/Courses/MainCoures'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/mycourses/')({
  component: MainCourses,
})


  